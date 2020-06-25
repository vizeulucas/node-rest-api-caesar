let express = require('express')
let bodyParser = require('body-parser')
let app = express()

const caesar_cipher = (sentence, key, to_cipher) => {
    if (key < 0) {
        return caesar_cipher(sentence, key + 26)
    }
    
    let parsed_sentence = ""
  
    for (let i = 0; i < sentence.length; i++) {
        let letter = sentence[i]
  
        if (letter.match(/[a-z]/i)) {
            let letter_char_value = sentence.charCodeAt(i)

            if(to_cipher) {
                var operation = letter_char_value + key
            } else {
                var operation = letter_char_value - key
            }
  
            if (letter_char_value >= 65 && letter_char_value <= 90) {

                letter = String.fromCharCode(((operation - 65) % 26) + 65)

            } else if (letter_char_value >= 97 && letter_char_value <= 122) {

                letter = String.fromCharCode(((operation - 97 ) % 26) + 97)

            }
        
        }
  
        parsed_sentence += letter
    }
  
    return parsed_sentence;
}

app.use(bodyParser.json())

app.get('/cipher', (req, res) => {
    key = req.body.key
    sentence = req.body.sentence
    parsed_sentence = caesar_cipher(sentence, key, true)
    res.status(200)
    res.send(parsed_sentence)
})

app.get('/decipher', (req, res) => {
    key = req.body.key
    sentence = req.body.sentence
    parsed_sentence = caesar_cipher(sentence, key, false)
    res.status(200)
    res.send(parsed_sentence)
})

app.listen(3000, () => {
    console.log('listen to 3000')
})
