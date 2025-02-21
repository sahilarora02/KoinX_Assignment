var tradeService = require("../services/tradeService")
var csv = require("csv-parser")
var fs = require("fs")

exports.uploadCsvFile = async (req, res) => {
  try{
    if(!req.file){
      return res.status(400).json({error: "No file uploaded" })
    }

    var filePath=req.file.path
    var trades = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data",(data) => {trades.push(data)})
      .on("end", async ()=>{
         var result = await tradeService.STORE_TRADE(trades)
        res.status(200).json(result) 
      }) .on("error", (err)=> res.status(500).json({ error: `Error reading file: ${err}` }))
  } catch (err) {
    res.status(500).json({ error: `Error uploading file: ${err}` })
  }
}

exports.getAssetBalance = async(req,res)=> {
  try {
    var { timestamp }= req.body
    if(!timestamp){
    return res.status(400).json({error:"Timestamp is required"})}

   var assetBalance = await tradeService.GET_ASSET_BALANCE_AT_TIMESTAMP(timestamp)
    res.status(200).json(assetBalance) 
  } catch (err) {
  res.status(500).json({ error: `Error getting asset balance: ${err}` })} 
}
