import Fastify from "fastify";
import cors from "@fastify/cors"

export const app = Fastify();

app.register(cors, {origin:true})

app.get("/", async () => {return {message: "uTask API running"}})