import express from "express";

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const routes = express();

routes.get("/ping", (req, res) => {
  res.send("pong!");
});

routes.post("/send-email", async (req, res) => {
  const { email } = req.body;

  console.log(`Received email: ${email}`);

  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
      },
    });

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }

  console.log(`Sending email to ${email}`);
});
