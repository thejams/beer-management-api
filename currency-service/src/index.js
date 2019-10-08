const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
const {CurrencyLayerHandler, RabbitMQHandler} = require('./handlers')
const currencyHandler = new CurrencyLayerHandler()

app.get('/value/:currency/:value', async (req, res) =>  {
    if(!req.params.currency && req.params.value)
        res.status(400).send('missing currency parameter')
    else {
        let beer = await currencyHandler.getCurrencyValue(req.params.value, req.params.currency)
        let currency = 'CLP'
        if (beer.isValidCurrency)
            currency = req.params.currency
        res.status(200).send(`${beer.value} ${currency}`)
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))