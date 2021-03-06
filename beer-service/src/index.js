const express = require('express')
const axios = require('axios')
const asyncRedis = require('async-redis')
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
const {RedisHandler} = require('./handlers')
const CURRENCY_URL = `http://${process.env.CURRENCY_SERVICE}` || 'localhost:5000'
const REDIS_SERVER = process.env.REDIS_URL || 'http://127.0.0.1:6379'
const redisHandler = new RedisHandler(asyncRedis, REDIS_SERVER)

app.get('/beers', async (req, res) =>  {
    let beers = await redisHandler.getBeers()
    res.status(200).send({beers})
})

app.get('/beers/:beerID/boxPrice', async (req, res) => {
    if(!req.params.beerID)
        res.status(400).send('missing beerID parameter')
    else {
        let beer = await redisHandler.getBeer(req.params.beerID)
        let quantity = (req.query.quantity) ? req.query.quantity : 1
        let price = beer.boxPrice * quantity
        if (req.query.currency) {
            const response = await axios.get(`${CURRENCY_URL}:5000/currencyValue`, { params: {currency: req.query.currency, value: price}, timeout: 5000 })
            if (response && response.data)
                res.status(200).send(response.data)
            else
                res.status(500).send(`internal error`)             
        } else
            res.status(200).send({value: price, currency: `CLP`})
    }
})

app.get('/beers/:beerID', async (req, res) =>  {
    if(!req.params.beerID)
        res.status(400).send('missing beerID parameter')
    else {
        let beer = await redisHandler.getBeer(req.params.beerID)
        res.status(200).send(beer)
    }
})

app.delete('/beers/:beerID', async (req, res) =>  {
    if(!req.params.beerID)
        res.status(400).send('missing beerID parameter')
    else {
        let beer = await redisHandler.deleteBeer(req.params.beerID)
        res.status(200).send(beer)
    }
})

app.post('/beers', async function (req, res) {
    if(!req.body || !req.body.name || !req.body.boxPrice)
        res.status(400).send('missing parameters')
    else {
        let beer = await redisHandler.saveBeer(req.body)
        res.status(200).send(beer)
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))