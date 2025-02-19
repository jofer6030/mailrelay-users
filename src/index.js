const serverless = require("serverless-http");
const express = require("express");

const { connectDB } = require("./db/connect");

const app = express();

exports.handler = async (event, context) => {
  try {
    await connectDB();

    app.get("/test", (req, res) => {
      res.send("¡Hola, mundo!");
    });

    app.get("/test/:name", (req, res) => {
      const { name } = req.params;
      res.send(`¡Hola, ${name}!`);
    });

    return serverless(app)(event, context);
  } catch (error) {
    console.error("Error en el handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en el servidor" }),
    };
  }
};
