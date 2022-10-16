const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post(`/signup`, async (req, res) => {
  const { firstName, lastName, email, username, gender } = req.body;
  console.log(email, username);
  const result = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      username,
      gender,
      request: {},
    },
  });
  res.json(result);
});

app.post(`/post`, async (req, res) => {
  const { date, pickup, hostUserName, domestic, active } = req.body;
  const result = await prisma.post.create({
    data: {
      date,
      pickup,
      host: { connect: { username: hostUserName } },
      domestic,
      active,
    },
  });
  res.json(result);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users:username", async (req, res) => {
  const username = req.params;
  const user = await prisma.user.findUnique({
    where: {
      username: String(username),
    },
  });
  res.json(user);
});

app.get("/requests", async (req, res) => {
  const {pick} = req.query;
  const requests = await prisma.post.findMany({
    where: { pickup: { contains: pick } },
    include: { domestic: true, active: true },
    orderBy: {
      date: orderBy || undefined,
    },
  });

  res.json(requests);
});

const server = app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
