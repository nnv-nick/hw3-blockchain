const Web3 = require("web3");


async function main() {
    var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.GOERLI_URL}`));

    const fs = require("fs");
    var abi = JSON.parse(fs.readFileSync("abi.json"));

    var signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    web3.eth.accounts.wallet.add(signer);
    web3.eth.defaultAccount = web3.eth.accounts[0];

    var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

    var cur_tx;

    cur_tx = contract.methods.add_to_mapping(1, {name: "first_element", logicVal: true, num: 1});
    cur_tx.send({from: signer.address, gas: 5 * await cur_tx.estimateGas()})
    .on('receipt', function(){
        console.log("Added the first element to the mapping!\n");
    });

    cur_tx = contract.methods.add_to_mapping(2, {name: "second_element", logicVal: false, num: 2});
    cur_tx.send({from: signer.address, gas: 5 * await cur_tx.estimateGas()})
    .on('receipt', function(){
        console.log("Added the second element to the mapping!\n");
    });

    cur_tx = contract.methods.delete_from_mapping(1);
    cur_tx.send({from: signer.address, gas: 5 * await cur_tx.estimateGas()})
    .on('receipt', function(){
        console.log("Deleted the first element from the mapping!\n");
    });

    // Unfortunately, filters in web3js aren't working
    console.log(await contract.getPastEvents());
}
  
require("dotenv").config();
main();
  