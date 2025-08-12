class SimpleTokenizer {
    constructor() {
        this.charToToken = {};
        this.tokenToChar = {};
        this.buildVocab();
    }

    buildVocab() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let tokenId = 0; // 0 can be reserved for special token like <PAD>

        const specialTokens = ["<SOS>", "<EOS>", "<UNK>"];
        for (let i = 0 ; i < specialTokens.length ; i++) {
            this.charToToken[specialTokens] = tokenId;
            this.tokenToChar[tokenId] = specialTokens;
            tokenId++;
        }


        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            this.charToToken[char] = tokenId;
            this.tokenToChar[tokenId] = char;
            tokenId++;
        }

        // Add special tokens
        this.charToToken["<UNK>"] = tokenId;
        this.tokenToChar[tokenId] = "<UNK>";
    }

    encode(text) {
        return text.split("").map(char =>
            this.charToToken[char] || this.charToToken["<UNK>"]
        );
    }

    decode(tokens) {
        return tokens.map(id =>
            this.tokenToChar[id] || "<UNK>"
        ).join("");
    }
}

// Example usage:
const tokenizer = new SimpleTokenizer();

const encoded = tokenizer.encode("Hyy my name is hyy");
console.log("Encoded:", encoded);

const decoded = tokenizer.decode(encoded);
console.log("Decoded:", decoded);
