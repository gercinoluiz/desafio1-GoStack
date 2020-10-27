const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  response.status(201).json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  repositoryIndex < 0
    ? response.status(400).json({ error: "Bad Request" })
    : null;

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    title: title,
    url: url,
    techs: techs,
  };

  response.status(200).json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  repoIndex < 0 ? response.status(400).json({ error: "Bad Request" }) : null;

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(
    (reposotory) => reposotory.id === id
  );

  repositoryIndex < 0
    ? response.status(400).json({ error: "Bad Request" })
    : null;

  repositories[repositoryIndex].likes++;

  response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
