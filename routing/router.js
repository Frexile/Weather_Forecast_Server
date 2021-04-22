const { response } = require("express");
const express = require("express");
const ApiRequesterClass = require("../supplementary/apiRequester");
const RepositoryClass = require("../supplementary/repository");

const router = express.Router();
const apiRequester = new ApiRequesterClass();
const repo = new RepositoryClass();

router.get("/weather/city", async (req, res) => {
  const jsonData = await apiRequester.getResponse(req.query.q.replace(/ /g, '%20'));

  if (!req.query.q) {
    res.status(404);
    res.sendStatus(404);
  } else if (jsonData.error) {
    res.status(400);
    res.sendStatus(400);
  } else {
    res.json(jsonData);
  }
});

router.get("/weather/coordinates", async (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
  
  const jsonData = await apiRequester.getResponse(`${lat},${long}`);

  if (jsonData.error) {
      res.status(404);
      res.sendStatus(404)
  } else {
      res.json(jsonData)
  }
});

router.get("/favourites", async (req, res) => {
  const favList = await repo.findAll();

  let favResponses = await Promise.all(favList.map( item => {
    return apiRequester.getResponse(item)
  }));

  res.json(favResponses);
});

router.post("/favourites", async (req, res) => {
  const jsonData = await apiRequester.getResponse(req.body.cityName);

  if (jsonData === 400) {
    res.sendStatus(400);
    return;
  } 

  if (await repo.isIncluded(jsonData.coords)) {
    console.log("This city is already in db");
    res.sendStatus(409);
    return;
  }

  await repo.insert(jsonData.cityName, jsonData.coords, res);
  
  res.sendStatus(201);
});

router.delete("/favourites", async (req, res) => {
  const jsonData = await apiRequester.getResponse(req.body.cityName);
  await repo.delete(jsonData.coords);

  res.sendStatus(204);
});

module.exports = {router: router, repo: repo};