const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/public"));
app.get("/", async (req, res) => {
  try {
    await fetch("https://api.wazirx.com/api/v2/tickers")
      .then((response) => response.json())
      .then((json) => {
        res.render("home", { data: json, coin: Object.keys(json) });
      });
  } catch {
    res.send("idiot");
  }
});

app.listen(port, () => {
  console.log(`App started on ${port} `);
});
