const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
const {RedisHandler, RabbitMQHandler} = require('./handlers')
const redisHandler = new RedisHandler()
const rabbitService = new RabbitMQHandler('beerService')

app.get('/beers', async (req, res) =>  {
    let beers = await redisHandler.getBeers()
    res.send(beers)
})

app.get('/beers/:beerID/boxPrice', async (req, res) => {
    if(!req.params.beerID)
        res.send('ERROR EN GET')
    else {
        let beer = await redisHandler.getBeer(req.params.beerID)
        let quantity = (req.query.quantity) ? req.query.quantity : 1
        let price = beer.boxPrice * quantity
        if (req.query.currency && rabbitService.isConnected()) {
            rabbitService.sendMessage('Greetings from the Micro Service #01', 'currencyService') 
            res.send(`${price} CLP`)             
        } else
            res.send(`${price} CLP`)
    }
})

app.get('/beers/:beerID', async (req, res) =>  {
    if(!req.params.beerID)
        res.send('ERROR EN GET')
    else {
        let beer = await redisHandler.getBeer(req.params.beerID)
        res.send(beer)
    }
})

app.delete('/beers/:beerID', async (req, res) =>  {
    if(!req.params.beerID)
        res.send('ERROR EN DELETE')
    else {
        let beer = await redisHandler.deleteBeer(req.params.beerID)
        res.send(beer)
    }
})

app.post('/beers', async function (req, res) {
    if(!req.body || !req.body.name || !req.body.currency || !req.body.description || !req.body.boxPrice)
        res.send('ERROR')
    else {
        await redisHandler.saveBeer(req.body)
        res.send('post request')
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))