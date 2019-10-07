const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
// const RabbitService = require('./rabbit-service')
// const rabbitService = new RabbitService('microService01')
const {RedisHandler} = require('./handlers')
const redisHandler = new RedisHandler()


app.get('/beers', async (req, res) =>  {
    let beers = await redisHandler.getBeers()
    res.send(beers)
//    if (rabbitService.isConnected()) {
//       rabbitService.sendMessage('Greetings from the Micro Service #01', 'microService02')
//       res.send('we already send a message to the micro service number 02')
//    } else {
//       await rabbitService.connectServer()
//       if (rabbitService.isConnected()) {
//          rabbitService.sendMessage('Greetings from the Micro Service #01 another try', 'microService02')
//          res.send('we send a message to the micro service number 02 after a second reconnect to rabbitmq server')
//       } 
//       else
//          res.send('rabbit is not connected, please try again in a few moments')
//    }
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