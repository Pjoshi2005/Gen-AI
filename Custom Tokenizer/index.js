class SimpleTokenizer {
    constructor() {
        this.charToToken = {};
        this.tokenToChar = {};
        this.buildVocab();
    }

    buildVocab() {
        let tokenId = 0;

        //special tokens
        const specialTokens = ["<SOS>", "<EOS>", "<UNK>"];
        for (let i = 0; i < specialTokens.length; i++) {
            this.charToToken[specialTokens[i]] = tokenId;
            this.tokenToChar[tokenId] = specialTokens[i];
            tokenId++;
        }

        // Lowercase letters a-z
        for (let i = 0; i < 26; i++) {
            const char = String.fromCharCode(97 + i); // 97 is 'a'
            this.charToToken[char] = tokenId;
            this.tokenToChar[tokenId] = char;
            tokenId++;
        }

        // Uppercase letters A-Z
        for (let i = 0; i < 26; i++) {
            const char = String.fromCharCode(65 + i); // 65 is 'A'
            this.charToToken[char] = tokenId;
            this.tokenToChar[tokenId] = char;
            tokenId++;
        }

        // Digits 0-9
        for (let i = 0; i < 10; i++) {
            const char = String.fromCharCode(48 + i); // 48 is '0'
            this.charToToken[char] = tokenId;
            this.tokenToChar[tokenId] = char;
            tokenId++;
        }
    }

    encode(text) {
        const tokens = [this.charToToken["<SOS>"]];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            tokens.push(this.charToToken[char] || this.charToToken["<UNK>"]);
        }
        tokens.push(this.charToToken["<EOS>"]);
        return tokens;
    }

    decode(tokens) {
        let result = "";
        for (let i = 0; i < tokens.length; i++) {
            const token = this.tokenToChar[tokens[i]];
            if (token !== "<SOS>" && token !== "<EOS>") {
                result += token;
            }
        }
        return result;
    }
}


const tokenizer = new SimpleTokenizer();

const encoded = tokenizer.encode("Hyy my name is hyy");
console.log("Encoded:", encoded);

const decoded = tokenizer.decode(encoded);
console.log("Decoded:", decoded);