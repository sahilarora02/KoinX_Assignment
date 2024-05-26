const Trade = require("../model/CryptoSchema.model");

exports.STORE_TRADE = async(trades)=>{
    try {
        const tradeData = trades.map((trade) => ({
            utcTime: trade.UTC_Time,
            operation: trade.Operation,
            market: trade.Market,
            baseCoin: trade.Market.split('/')[0],
            quoteCoin: trade.Market.split('/')[1],
            amount: trade['Buy/Sell Amount'],
            price: trade.Price,
          }));
      
          const result = await Trade.insertMany(tradeData);
          return { message: 'Trades stored successfully', count: result.length };
    } catch (error) {
        throw new Error(`Error storing trades: ${err}`);
    }
}

exports.GET_ASSET_BALANCE_AT_TIMESTAMP = async (timestamp) => {
    try {
      const trades = await Trade.find({ utcTime: { $lte: new Date(timestamp) } }).sort({ utcTime: 1 });
  
      const assetBalance = {};
  
      trades.forEach((trade) => {
        const { baseCoin, amount, operation } = trade;
        const balance = assetBalance[baseCoin] || 0;
  
        if (operation === 'Buy') {
          assetBalance[baseCoin] = balance + amount;
        } else {
          assetBalance[baseCoin] = balance - amount;
        }
      });
  
      return assetBalance;
    } catch (err) {
      throw new Error(`Error getting asset balance: ${err}`);
    }
  };