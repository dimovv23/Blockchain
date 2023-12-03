import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/get-data", async (req, res) => {
  const userInput = req.body.symbol;
  try {
    const result = await axios.get(API_URL + "/tickers/" + userInput);
    console.log(result.data);
    res.render("index.ejs", {
      content: result.data.symbol,
      price: result.data.price_24h,
      volume: result.data.volume_24h,
      trade_price: result.data.last_trade_price,
    });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
