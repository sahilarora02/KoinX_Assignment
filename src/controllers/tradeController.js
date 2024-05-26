const tradeService = require("../services/tradeService");
const csv = require("csv-parser");
const fs = require("fs");

exports.uploadCsvFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const trades = []; 

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => trades.push(data))
      .on("end", async () => {
        const result = await tradeService.STORE_TRADE(trades);
        res.status(200).json(result);
      })
      .on("error", (err) => {
        res.status(500).json({ error: `Error reading file: ${err}` });
      });
  } catch (err) {
    res.status(500).json({ error: `Error uploading file: ${err}` });
  }
};
exports.getAssetBalance = async (req, res) => {
  try {
    const { timestamp } = req.body;
    if (!timestamp) {
      return res.status(400).json({ error: 'Timestamp is required' });
    }

    const assetBalance = await tradeService.GET_ASSET_BALANCE_AT_TIMESTAMP(timestamp);
    res.status(200).json(assetBalance);
  } catch (err) {
    res.status(500).json({ error: `Error getting asset balance: ${err}` });
  }
};
