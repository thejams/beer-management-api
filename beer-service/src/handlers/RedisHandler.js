const asyncRedis = require('async-redis')
const uuidv4 = require('uuid/v4')

class RedisHandler {
  constructor() {
    this.client = asyncRedis.createClient(process.env.REDIS_URL)
  }

  async getBeers() {
    return new Promise(async (resolve, reject) => {
      let beers = await this.client.get('beerData')
      beers = JSON.parse(beers)
      resolve(beers)
    })
  }

  async getBeer(beerID) {
    return new Promise(async (resolve, reject) => {
      let beers = await this.getBeers()
      let filteredBeers = beers.filter(beerObject => beerObject.beerID == beerID)
      resolve(filteredBeers[0] || {})
    })
  }

  async deleteBeer(beerID) {
    return new Promise(async (resolve, reject) => {
      let beers = await this.getBeers()
      beers = beers.filter(beerObject => beerObject.beerID !== beerID)
      await this.client.set('beerData', JSON.stringify(beers))
      resolve(beers)
    })
  }

  async saveBeer(beer) {
    beer.beerID = uuidv4()
    let beers = await this.getBeers()
    if (!beers)
      beers = [beer]
    else {
      let filteredBeers = beers.filter(beerObject => beerObject.name == beer.name)
      if (!filteredBeers || filteredBeers.length === 0)
        beers = [...beers, beer]
    }
    await this.client.set('beerData', JSON.stringify(beers))
    return Promise.resolve(beer)
  }
}

module.exports = RedisHandler