const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
const {RedisHandler, RabbitMQHandler} = require('./handlers')
const redisHandler = new RedisHandler()
const rabbitService = new RabbitMQHandler('beerService')

app.get('/beers', async (req, res) =>  {
    let beers = await redisHandler.getBeers()
    res.status(200).send(beers)
})

app.get('/beers/:beerID/boxPrice', async (req, res) => {
    if(!req.params.beerID)
        res.status(400).send('missing beerID parameter')
    else {
        let beer = await redisHandler.getBeer(req.params.beerID)
        let quantity = (req.query.quantity) ? req.query.quantity : 1
        let price = beer.boxPrice * quantity
        console.log(rabbitService.isConnected())
        console.log('rabbitService.isConnected()')
        console.log('')
        if (req.query.currency && rabbitService.isConnected()) {
            rabbitService.sendMessage('Greetings from the Micro Service #01', 'currencyService') 
            res.status(200).send(`${price} CLP`)             
        } else
            res.status(200).send(`${price} CLP`)
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
    if(!req.body || !req.body.name || !req.body.currency || !req.body.description || !req.body.boxPrice)
        res.status(400).send('missing parameters')
    else {
        let beer = await redisHandler.saveBeer(req.body)
        res.status(200).send(beer)
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))