const JSEncrypt = require('node-jsencrypt');
var Crypto = require('crypto');

const jsEncrypt = new JSEncrypt();

//Generation d'une chaine aléatoire
Crypto.randomBytes(48, function(err, buffer) {
    //console.log("hex");
    var token = buffer.toString('hex');
    //console.log(token);
  });
  //console.log("base64");
  var basse = Crypto.randomBytes(48).toString('base64');
  //console.log(basse);

//<<<<<<<<<<<<<<<<< Encodage / decodage d'un fichier text en base64 >>>>>>>>>>>>>>>>

// Include fs module and  CryptoJS 
var fs = require('fs');
var CryptoJS = require("crypto-js");
// Use fs.readFile() method to read the file
fs.readFile('moulay_amayoud.txt', 'utf8',  function(err, data){
   
    //encrypt
    var wordArray = CryptoJS.enc.Utf8.parse(data);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    //console.log('encoded:', base64);
    
    //decrypt
    var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
    var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    //console.log("decoded:",parsedStr);
        
    //console.log(data);

});



//<<<<<<<<<<<<<<<<<<<< Chiffrement Symmetric / dechiffrement Symmetric d'un fichier texte  >>>>>>>>>

const key ="Moulay_Amayoud-ICCN3";
const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

function encrypt(value, useKey = key) {
    var cipher = Crypto.createCipher(algorithm, key);
    var encrypted = cipher.update(value, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding)
    return encrypted
}

function decrypt(encrypted, useKey = key) {
    var decipher = Crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(encrypted, outputEncoding, inputEncoding)
    decrypted += decipher.final(inputEncoding)
    return decrypted
}


fs.readFile('moulay_amayoud.txt', 'utf8',  function(err, data){
   
    //encrypt
    var EncryptedData = encrypt(data);
  //  console.log("<<<<<<<< Symmetric Encryption >>>>>>>>");
  //  console.log("Encryption");
  //  console.log(EncryptedData);

    
    //decrypt
    //console.log("Decryption");
    // console.log(decrypt(EncryptedData));   


});

 //<<<<<<<<<< Chiffrement Asymmetric >>>>>>>>>
// =======>Generation des clés Publique et Privé
let  { generateKeyPair } = require('crypto');
 generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
  // Encrypt with the public key...
    jsEncrypt.setPublicKey(publicKey);
    var encrypted = jsEncrypt.encrypt("ICCN_INPT");
    console.log("Encrypted data : ");
    console.log(encrypted);
    // Decrypt with the private key...
    jsEncrypt.setPrivateKey(privateKey);
    var uncrypted = jsEncrypt.decrypt(encrypted);
    console.log("uncrypted data : ");
    console.log(uncrypted);
    // Now a simple check to see if the round-trip worked.
    if (uncrypted == "ICCN_INPT") {
    console.log('It works!!!');
    }
    else {
        console.log('Something went wrong....');
    }
});

