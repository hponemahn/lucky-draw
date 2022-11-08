# lucky-draw
 
A Lucky Draw Contract will have a prize pool and a list of people(players) who have entered for the prize pool. These players can send some amount of money. After some number of people have entered the contract or entered the contest, a third person or a third party of sorts who we will refer to as a manager will tell the contract to pick a winner. The contract will look at its list of participants and pick one of these players. It will send all the money out of the prize pool to that particular winner. 

### Features
- players can send money to the prize pool
- show managed account, total numbers of players and amount of winning price. 
- manager pick a winner and send all the money to winner

### Technologies Used
- Web3
- Solidity
- Mocha
- Truffle
- Ganache CLI

### Installation
- git clone
- npm install
- place your 12-word mnemonic private key and Goerli url at the location lucky-draw/deploy.js.
`const mnemonicPhrase = ""; // 12 word mnemonic
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: "",
});`
- testing
`"scripts": {
    "test": "mocha"
  },`
- run
`node deploy.js`
