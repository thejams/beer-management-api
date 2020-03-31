const redisServer = require("redis-mock")
const {RedisHandler} = require('./index')
const REDIS_SERVER = 'http://127.0.0.1:6379'
const redisHandler = new RedisHandler(redisServer, REDIS_SERVER)

test('should save a beer in redis', async () => {
    let beerData = {
        "name": "Corona",
        "description": "Cerveza mejicana",
        "currency": "CLP",
        "boxPrice": 7000
    }
    let beer = await redisHandler.saveBeer(beerData)
    expect(beer.name).toEqual(beerData.name)
    expect(beer.description).toEqual(beerData.description)
    expect(beer.currency).toEqual(beerData.currency)
    expect(beer.boxPrice).toEqual(beerData.boxPrice)
    expect(beer).toHaveProperty('beerID') 
})

test('should return an object with the data of the beer pack save in redis', async () => {
    let beerData = {
        "name": "Corona",
        "description": "Cerveza mejicana",
        "currency": "CLP",
        "boxPrice": 7000
    }
    let newBeer = await redisHandler.saveBeer(beerData)
    let beer = await redisHandler.getBeer(newBeer.beerID)
    expect(beer.name).toEqual(beerData.name)
    expect(beer.description).toEqual(beerData.description)
    expect(beer.currency).toEqual(beerData.currency)
    expect(beer.boxPrice).toEqual(beerData.boxPrice)
    expect(beer).toHaveProperty('beerID') 
})
