const fs = require('fs');
const path = require('path');
const solc = require('solc');

const luckyDrawPath = path.resolve(__dirname, 'contracts', 'LuckyDraw.sol');
const source = fs.readFileSync(luckyDrawPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'LuckyDraw.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [
                    '*'
                ]
            }
        }
    }
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['LuckyDraw.sol'].LuckyDraw;