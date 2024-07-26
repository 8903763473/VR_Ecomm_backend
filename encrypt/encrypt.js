const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

// Generate the key and IV once and reuse them, or generate them per encryption (for this example, we generate them per encryption)
function generateKeyAndIv() {
    const key = crypto.randomBytes(32); // 32 bytes key
    const iv = crypto.randomBytes(16);  // 16 bytes IV
    return { key, iv };
}

// Encrypt function
// function encrypt(text) {
//     const { key, iv } = generateKeyAndIv();
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') };
// }

function encrypt(text) {
    const { key, iv } = generateKeyAndIv();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted, key: key.toString('hex') };
}

// Decrypt function
function decrypt(encryptedText, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };
