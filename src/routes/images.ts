import { Hono } from "hono";
import Metadata_images from "../image_name";
import { IdGenerator } from "../fonctions";
import { Bindings, Image_object } from "../../types";

import Prisma from "../../prisma/function";

const images = new Hono<{ Bindings: Bindings }>();

images.get("/", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);

  const images = await prisma.images.findMany({
    select: {
      createdAt: true,
      name: true,
      path: true,
      size: true,
      ID: true,
    },
  });

  return json({
    message: "success",
    data: images,
  });
});

images.post("/", async ({ req, res, env, json, text }) => {
  // @ts-ignore
  const bucket = env["storage-policarpe"];
  const prisma = Prisma(env);
  const { images } = (await req.parseBody()) as { images: File };

  try {
    const metadata = Metadata_images(images) as Image_object;

    const object = {
      ...metadata,
      path: "/" + metadata?.name,
    };

    const imageData = await prisma.images.create({
      data: {
        size: object.size as number,
        name: object.name as string,
        lastmodified: object.lastmodified as number,
        minetype: object.minetype as string,
        originalname: object.originalname as string,
        path: object.path,
      },
    });

    //@ts-ignore
    await bucket.put(object.name, images, {
      customMetadata: {
        name: object.name,
        size: object.size,
        type: object.minetype,
        lastModified: object.lastmodified,
      },
      httpMetadata: {
        contentType: object.minetype,
      },
    });

    return json({
      message: "image Enregistre",
      data: imageData,
    });
  } catch (error) {
    console.log(error);
    return text("il y a une erreur " + error);
  }
});

images.get("/:images", async ({ json, env, res, req }) => {
  const { images } = req.param();
  // @ts-ignore
  const bucket = env["storage-policarpe"];

  // @ts-ignore
  const files = await bucket.get(images);

  if (files === null) {
    return json("il y n'a pas ce fichier");
  }

  const headers = new Headers();
  files.writeHttpMetadata(headers);
  headers.set("etag", files.httpEtag);

  return new Response(files.body, { headers });
});

images.delete("/:image", async ({ json, req, res, env }) => {
  const { image } = req.param();
  const { id } = req.query();
  const prisma = Prisma(env);
  //@ts-ignore
  const bucket = env["storage-policarpe"];
  try {
    await bucket.delete(image);
    await prisma.images.delete({
      where: {
        ID: id,
      },
    });

    return json({
      message: `image ${image} supprimer avec succes`,
    });
  } catch (e) {
    return json({
      message: "il y a une erreur dans le serveur",
      error: e,
    });
  }
});

export default images;
