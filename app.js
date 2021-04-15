require('dotenv').config()
const express = require("express");
const cors = require("cors");
const apiRequesterClass = require("./apiRequester");
const RepositoryClass = require("./repository");

const app = express();
const apiRequester = new apiRequesterClass();
const repo = new RepositoryClass();


app.get("/", async (req, res) => {
    res.send()
    await repo.connect()
    await repo.findAll();

    // repo.insert();
});

app.get("/weather/city", async (req, res) => {
    if (!req.query.q) {
        res.status(404);
        res.sendStatus(404);
    } else {
        res.json(await apiRequester.getResponse(req.query.q.replace(/ /g, '%20')));
    }
});

app.get("/weather/coordinates", async (req, res) => {
    // let regexp = /[-]?\d+[.]?\d+/g;
    // const coords = req.url.match(regexp);

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

app.get("/favourites", async (req, res) => {
    await repo.connect();
    const favList = await repo.findAll();

    let favResponses = await Promise.all(favList.map( item => {
        return apiRequester.getResponse(item)
    }));

    res.json(favResponses);
});

app.post("/favourites", async (req, res) => {

});

app.delete("/favourites", async (req, res) => {

});

app.use(cors())
app.listen(process.env.PORT || 3000)


