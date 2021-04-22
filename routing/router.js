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
    res.status(404).send();
    return;
  } else if (jsonData.error) {
    res.status(400).send();
    return;
  }

  res.json(jsonData);
});

router.get("/weather/coordinates", async (req, res) => {
  // let lat = req.query.lat;
  // let long = req.query.long;

  let {lat, long} = req.query;

  const jsonData = await apiRequester.getResponse(`${lat},${long}`);

  if (jsonData.error) {
    res.status(404).send();
    return;
  } 

  res.json(jsonData);
});

router.get("/favourites", async (req, res) => {
  const favList = await repo.findAll();

  let favResponses = await Promise.all(favList.map( item => {
    return apiRequester.getResponse(item);
  }));

  res.json(favResponses);
});

router.post("/favourites", async (req, res) => {
  const jsonData = await apiRequester.getResponse(req.body.cityName);

  if (jsonData === 400) {
    res.status(400).send();
    return;
  } 

  if (await repo.isIncluded(jsonData.coords)) {
    console.log("This city is already in db");
    res.status(409).send();
    return;
  }

  await repo.insert(jsonData.cityName, jsonData.coords, res);
  
  res.status(201).send();
});

router.delete("/favourites", async (req, res) => {
  const jsonData = await apiRequester.getResponse(req.body.cityName);
  await repo.delete(jsonData.coords);

  res.status(204).send();
});

module.exports = {router, repo};