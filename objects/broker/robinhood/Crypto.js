const Robinhood = require('./Robinhood');
const request = require('request');

/**
 * Market data for the given coin.
 */
class Crypto extends Robinhood {

    constructor(object) {
        if (!object instanceof Object) throw new Error("Parameter 'object' must be an object.");
        else {
            super();
            this.ask = Number(object.ask_price);
            this.bid = Number(object.bid_price);
            this.mark = Number(object.mark_price);
            this.open = Number(object.open_price);
            this.high = Number(object.high_price);
            this.low = Number(object.low_price);
            this.volume = Number(object.volume);
            this.symbol = String(object.symbol);
            this.id = String(object.id);
        }
    }

    /**
     * Returns a fundamentals object for the given symbol.
     * @param {String} symbol
     * @returns {Promise<Fundamentals>}
     */
    static getBySymbol(symbol, user) {
        return new Promise((resolve, reject) => {
            if (!symbol instanceof String) reject(new Error("Parameter 'symbol' must be a string."));
            else request({
                headers: {
                    'Authorization': 'Bearer ' + user.getAuthToken()
                },
                uri: "https://api.robinhood.com/marketdata/forex/quotes/" + symbol + "/"
            }, (error, response, body) => {
                return Robinhood.handleResponse(error, response, body, null, res => {
                    resolve(new Crypto(res));
                }, reject);
            })
        })
    }

}

module.exports = Crypto;