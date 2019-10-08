const {CurrencyLayerHandler} = require('./index')
const currencyHandler = new CurrencyLayerHandler()

test('should return a response in CLP currency, when an invalid one gets received', async () => {
    let expectedResponse = {
        value: 1000, 
        isValidCurrency: false
    }
    let currencyValue = await currencyHandler.getCurrencyValue(1000, 'INVALID_CURRENCY')
    expect(currencyValue).toEqual(expectedResponse)
})

test('should return a valid object in BRL currency', async () => {
    let expectedResponse = { 
        value: 56.412616735112174, 
        isValidCurrency: true 
    }

    let currencyValue = await currencyHandler.getCurrencyValue(10000, 'BRL')
    expect(currencyValue).toEqual(expectedResponse)
})
