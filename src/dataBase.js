const { MongoClient } = require('mongodb')

let uri;
if ("true" == process.env.ISHEROKU)
    uri = process.env.CONNLINK;
else
    uri = "mongodb://localhost:27017/"

let client = new MongoClient(uri)

async function connectToDataBase() {
    try {
        await client.connect()
        console.log('[DataBase Connected]')
    } catch (e) {
        console.log('[Not Connected To DataBase]')
        console.log(e)
    }
}
connectToDataBase()

function randomString(size) {
    let availChars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let res = "";
    for (let i = 0; i < size; i++) {
        let randInd = parseInt(Math.random() * availChars.length * 10) % availChars.length;
        res += availChars.charAt(randInd);
    }
    return res;
}

async function doesItExist(link) {
    let x = await client.db('billuData').collection('urls').find({
        'old': link
    }).toArray()
    if (x.length > 0) return x[0]['new']
    else return false
}

async function createNewLink(link) {
    let nw = randomString(6)

    await client.db('billuData').collection('urls').insertOne({
        'new': nw,
        'old': link
    })
    return nw
}

async function getOg(shrt) {
    let x = await client.db('billuData').collection('urls').find({
        'new': shrt
    }).toArray()
    if (x.length === 0) return false
    return x[0]['old']
}

module.exports = {
    doesItExist,
    createNewLink,
    getOg
}