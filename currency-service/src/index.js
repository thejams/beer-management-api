const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
const {CurrencyLayerHandler} = require('./handlers')
const currencyHandler = new CurrencyLayerHandler()

app.get('/currencyValue', async (req, res) =>  {
    if(!req.query.currency && req.query.value)
        res.status(400).send('missing currency parameter')
    else {
        let currencyValue = await currencyHandler.getCurrencyValue(req.query.value, req.query.currency.toString().toUpperCase())
        let currency = 'CLP'
        if (currencyValue.isValidCurrency)
            currency = req.query.currency
        res.status(200).send({value: currencyValue.value, currency: currency.toString().toUpperCase()})
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))