import {cryptoData} from "./cryptodata.js";
import {cryptoAssets} from "./cryptoassets.js";

export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 500)
    })
}

export function fetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 500)
    })
}