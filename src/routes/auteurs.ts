import { Hono } from "hono";
import Prisma from "../../prisma/function";
import { IdGenerator } from "../fonctions";
import { Bindings } from "../../types";

const Auteur = new Hono<{ Bindings: Bindings }>();

Auteur.get("/", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);

  try {
    const auteur = await prisma.auteur.findMany();
    return json(
      {
        message: "success",
        data: auteur,
      },
      200
    );
  } catch (e) {
    console.log(e);
    return json(
      {
        message: "il ya une erreur",
      },
      500
    );
  }
});
Auteur.get("/:auteurID", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);
  const auteurID = req.param("auteurID");

  try {
    const auteur = await prisma.auteur.findUnique({
      where: {
        ID: auteurID,
      },
    });
    // const articles = await prisma.findMany
    return json(
      {
        message: "success",
        data: auteur,
      },
      200
    );
  } catch (e) {
    console.log(e);
    return json(
      {
        message: "il ya une erreur",
      },
      500
    );
  }
});

Auteur.post("/", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);

  const database = env.DB;

  const data = await req.formData();
  const name = data.get("name") as string;
  const surname = data.get("surname") as string;
  const email = data.get("email") as string;
  const tel = data.get("tel") as string;
  const socialNetwork = data.get("socialNetwork") as string;

  const request = { name, surname, email, tel, socialNetwork };

  try {
    const auteurs = await prisma.auteur.create({
      data: request,
    });
    return json({
      message: "auteur enregistrer",
      auteurs,
    });
  } catch (e) {
    await prisma.$disconnect();
    return json(
      {
        error: e,
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

Auteur.put("/:auteurID", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);
  const auteurID = req.param("auteurID");

  const data = await req.formData();
  const name = data.get("name") as string;
  const surname = data.get("surname") as string;
  const email = data.get("email") as string;
  const tel = data.get("tel") as string;
  const socialNetwork = data.get("socialNetwork") as string;

  const request = { name, surname, email, tel, socialNetwork };

  try {
    const data = await prisma.auteur.updateMany({
      where: {
        ID: auteurID,
      },
      data: { ...request },
    });

    return json({
      message: `${auteurID} - auteur modifié avec succes`,
      data,
    });
  } catch (error) {
    console.log(error);
    return json({
      message: `erreur dans la serveur`,
    });
  } finally {
    await prisma.$disconnect();
  }
});

Auteur.delete("/:auteurID", async ({ req, res, json, env }) => {
  const prisma = Prisma(env);
  const auteurID = req.param("auteurID");

  try {
    const data = await prisma.auteur.deleteMany({
      where: {
        ID: auteurID,
      },
    });

    return json({
      message: `${auteurID} - auteur supprimé`,
      data,
    });
  } catch (error) {
    console.log(error);
    return json({
      message: `erreur dans la serveur`,
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default Auteur;
