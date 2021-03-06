const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const findIndex = (list, id) => list.findIndex(item => item.id === id);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = findIndex(repositories, id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  const repositorie = {
    ...repositories[repositorieIndex],
    title,
    url,
    techs
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = findIndex(repositories, id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = findIndex(repositories, id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  const repositorie = {
    ...repositories[repositorieIndex],
    likes: repositories[repositorieIndex].likes + 1,
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)
});

module.exports = app;
