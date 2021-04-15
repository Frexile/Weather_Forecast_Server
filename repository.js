const MongoClient = require('mongodb').MongoClient;

class Repository {

  async connect() {
    try {
      this.client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      this.collection = await this.client.db(process.env.MONGO_DB).collection(process.env.MONGO_COLLECTIONS);

      console.log(`Connection to ${this.collection.collectionName} is successfully done`);
    } catch (err) {
      console.error(err);
    }
  }

  async isIncluded(coords) {
    let res = await this.collection.find({lat : coords.lat, lon : coords.lon})
    return res !== null;
  }

  async insert(city, coords) {
    let obj = {cityName : city, lat : coords.lat, lon : coords.lon}

    if (await isIncluded()) {
      return;
    }

    this.collection.insertOne(obj, (err, res) => {
      console.log(res);
    });
  }
  
  async findAll() {
    const output = []

    await this.collection.find().forEach(elem => {
      output.push(elem.cityName);
    });
    
    return output;
  }

  delete() {

  }

  disconnect() {
    this.client.close()
  }
}

module.exports = Repository;