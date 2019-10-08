const axios = require("axios")

class CurrencyLayerHandler {
  constructor(apiKey) {
    this.apiKey = process.env.CURRENCY_LAYER_LEY || 'adbbce308048ec60418c2e50bee0b2ee'
    this.url = `http://www.apilayer.net/api/live`
  }

  async getCurrencyValue(value, currency) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`${this.url}`, { params: {access_key: this.apiKey, currencies: `CLP, ${currency}`}, timeout: 5000 })
        if (response && response.data && response.data.quotes) {
          let isValidCurrency = false
          let valueInUSDFromCLP = value / response.data.quotes[`USDCLP`] // valor en dolares del monto total
          let valueInForeignCurrency = valueInUSDFromCLP * response.data.quotes[`USDCLP`] // valor del monto en moneda extranjera
          if (response.data.quotes.hasOwnProperty(`USD${currency}`)) {
            valueInForeignCurrency = valueInUSDFromCLP * response.data.quotes[`USD${currency}`] // valor del monto en moneda extranjera
            isValidCurrency = true
          }
          resolve({value: valueInForeignCurrency, isValidCurrency})
        }
    })
  }
}

module.exports = CurrencyLayerHandler
