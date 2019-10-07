const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
// const RabbitService = require('./rabbit-service')
// const rabbitService = new RabbitService('microService01')
const RedisHandler = require('./handlers/RedisHandler')
// const redisHandler = new RedisHandler()


app.get('/', async (req, res) =>  {
    res.send('beer service alive')
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

app.post('/beers', function (req, res) {
    console.log(req.body)
    console.log('')
    // await redisHandler.saveCitiesLocation()
    res.send('post request')
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))