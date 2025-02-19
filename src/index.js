const serverless = require("serverless-http");
const express = require("express");

const { connectDB } = require("./db/connect");

const app = express();

exports.handler = async (event, context) => {
  try {
    await connectDB();

    app.post("/mailrelay-users", (req, res) => {
      // TODO: Implementar la lógica para guardar un usuario en la base de datos
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
