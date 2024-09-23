import { Hono } from "hono";
import Auteur from "./routes/auteurs";
import { Bindings } from "../types";
import images from "./routes/images";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", ({ json }) => {
  return json({
    message: "API Policarpe Essomba",
  });
});

app.route("/image", images);
app.route("/auteurs", Auteur);

export default app;

// wrangler d1 execute note_database --file schemas/.sql
