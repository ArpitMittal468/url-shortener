const fs = require('fs');

const resourceLocator = {}

function recusiveList(currPath) {
    try {
        let x = fs.readdirSync(currPath);
    }
    catch {
        currPath
        resourceLocator[currPath.slice(1)] = fs.readFileSync(currPath)
        return
    }
    for (const p of fs.readdirSync(currPath))
        recusiveList(currPath + '/' + p);
}

recusiveList('./public')

// console.log(resourceLocator)
// for (let path in resourceLocator) console.log(path)

function getFile(path) {
    return resourceLocator[path]
}

module.exports = {
    getFile
}