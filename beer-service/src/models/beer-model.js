const BEER_SCHEMA = {
    "id": "/BeerSchema",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "currency": {"type": "string"},
        "description": {"type": "string"},
        "boxPrice": {"type": "integer", "minimum": 1}
    }
}

module.exports = {
    BEER_SCHEMA
}
