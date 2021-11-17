let message = ""
let toMessage = ""
let scrambling = true
let randomArray = []
let HSize;
async function post() {
    location.href = "#page3";
    document.getElementById('copyBttn').innerHTML = "Copy"
    message = document.getElementById('input').value
    scrambling = true

    HSize = message.length + 20;
    let k = 0;
    let x = ""
    for (let ch of message) {
        x += `<h1 id = "${'h' + k}">${ch}</h1>` 
        k++
    }
    document.getElementById('linkAni').innerHTML = x

    setTimeout(Scrambeler, 1000)
    // console.log(randomArray)
    // setTimeout(() => { scrambling = false }, 2000);
    try {
        let y = await fetch('/urlPost', {
            "method": 'POST',
            "body": document.getElementById('input').value
        })
        y = await y.json()
        if (y['CD'] === 'WR')
            toMessage = y['ST']
        else
            toMessage = window.location.origin + '/' + y['ST']
        console.log(y)
    }
    catch (e) {
        toMessage = "Something-Went-Wrong"
    }
    finally {
        scrambling = false
    }
    randomArray = []
    for (let i = 0; i < toMessage.length; i++) randomArray.push(i);
    for (let i = 0; i < toMessage.length; i++) {
        let ind = parseInt(Math.random() * 1000) % toMessage.length;
        // console.log(ind)
        randomArray.push(randomArray.splice(ind, 1)[0])
    }

}

function getRandomChar() {
    let set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let ind = parseInt(Math.random() * 100) % set.length;
    return set.charAt(ind)
}

function Scrambeler() {

    message = message.split('')
    if (scrambling) {
        let numberOfTimes = parseInt(Math.random() * 100) % 3 + 1;
        for (let i = 0; i < numberOfTimes; i++) {
            let ind = parseInt(Math.random() * 100) % message.length
            message[ind] = getRandomChar()
        }
    } else {
        if (message.length !== toMessage.length) {
            if (message.length < toMessage.length) message.push(getRandomChar())
            if (message.length > toMessage.length) {
                let diff = Math.abs(toMessage.length - message.length)
                // console.log(diff)
                let reducer = 1
                if (diff > 10) {
                    reducer = parseInt(diff / 3)
                }

                while (reducer > 0 && message.length > toMessage.length) {
                    message.pop()
                    reducer--;
                }
            }
            // console.log(message.length, toMessage.length)
        }
        if (message.length >= toMessage.length && randomArray.length > 0) {
            // console.log(randomArray)
            let ind = randomArray.pop();
            if (ind !== undefined)
                message[ind] = toMessage[ind]
        }

    }
    let x = ""
    for (let ch of message) x += `<h1>${ch}</h1>`

    document.getElementById('linkAni').innerHTML = x

    message = message.join('')

    // console.log(message, toMessage)
    if (message !== toMessage)
        setTimeout(Scrambeler, 100)
}

async function copy() {
    await copyToClipboard(toMessage)
    document.getElementById('copyBttn').innerHTML = "Copied ✔️"
}

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}