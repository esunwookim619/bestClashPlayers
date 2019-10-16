const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const cors = require("cors");

app.use(express.static("dist"));
app.use(cors());

const key = require("./my_key");

app.get("/locations/:locationId", (request, response) => {

  fetch(
    `https://api.clashroyale.com/v1/locations/${request.params.locationId}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + key.key
      }
    }
  )
    .then(response => {
      return response.text();
    })

    .then(body => {
      let results = JSON.parse(body);
      console.log(results); // logs to server
      response.send(results); // sends to frontend
    });
});

// create a search route
app.get("/search", (request, response) => {
  fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results);
      response.send(results);
    });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
