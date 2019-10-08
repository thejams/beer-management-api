const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
const {CurrencyLayerHandler, RabbitMQHandler} = require('./handlers')
const currencyHandler = new CurrencyLayerHandler()
const rabbitService = new RabbitMQHandler('currencyService')

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

app.get('/value/:currency', async (req, res) =>  {
    if(!req.params.currency)
        res.send('ERROR EN GET')
    else {
        let beer = await currencyHandler.getCurrencyValue(10000, req.params.currency)
        console.log(beer)
        res.send(`${beer} ${req.params.currency}`)
    }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))