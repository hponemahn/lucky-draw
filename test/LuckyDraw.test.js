const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');

let luckyDraw;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    luckyDraw = await new web3.eth.Contract(abi)
                .deploy({data: evm.bytecode.object})
                .send({from: accounts[0], gas: '1000000'});
});

describe('Lucky Draw Contract', () => {
    it('deploys a contract', () => {
        assert.ok(luckyDraw.options.address);
        console.log('lucky draw deployed address', luckyDraw.options.address);
        console.log('accounts', accounts);
    });

    it('allows one account to enter', async () => {
        await luckyDraw.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await luckyDraw.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(players[0], accounts[0]);
        assert.equal(1, players.length);

    });

    it('allow multiple accounts to enter', async () => {
        await luckyDraw.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await luckyDraw.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await luckyDraw.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await luckyDraw.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);

    });

    it('requires a minimum amount of ether to enter', async () => {
        try {
            await luckyDraw.methods.enter().send({
                from: accounts[0],
                value: 0
            });

            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('only manager can call pickWinner', async () => {
        try {
          await lottery.methods.pickWinner().send({
            from: accounts[1],
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

    it('sends money to the winner and resets the players array', async () => {
        await luckyDraw.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        console.log('initial balance', initialBalance);
        await luckyDraw.methods.pickWinner().send({from: accounts[0]});
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        console.log('final balance', finalBalance);
        const difference = finalBalance - initialBalance;
        console.log('difference', difference);

        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });
});