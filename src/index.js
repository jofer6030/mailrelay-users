const serverless = require("serverless-http");
const express = require("express");

const { connectDB } = require("./db/connect");
const {
  createUser,
  updateUser,
} = require("./controllers/usersMailrelayController");

const app = express();

exports.handler = async (event, context) => {
  try {
    await connectDB();

    app.post("/mailrelay-users", createUser);

    return serverless(app)(event, context);
  } catch (error) {
    console.error("Error en el handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en el servidor" }),
    };
  }
};
