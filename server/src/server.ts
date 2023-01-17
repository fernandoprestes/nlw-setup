import Fastify from "fastify";
import cors from "@fastify/cors";
import { AppRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(AppRoutes);

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("Server is running port 3000");
  });
