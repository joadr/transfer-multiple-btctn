# Transfer Multiple addresses in a single BTC Test Network Transaction
The idea is to test receiving from multiple outputs in UTXO based blockchains.

## Quickstart
* Run `npm install`
* Run `npm run build`
* Run `npm run start:prod`
* Create a new address (GET http://localhost:3000/createAddress)
* Copy the address code and add it in `app.service.ts` in line 45.
* Copy the secret wif and add it in `app.service.ts` in line 48.
* Replace with your own addresses in `app.service.ts` lines 42 to 44.
* Send some Bitcoin to your new generated address code and wait for it to confirm (https://testnet-faucet.mempool.co/)
* Once confirmed copy the transaction hash and add it in `app.service.ts` in line 38.
* If you modify the amount of outputs or inputs, be sure to update the fee in line 35 and change the amounts to send each output.
* Call the sendMultiple endpoint (GET http://localhost:3000/createAddress) and copy the resulting raw transaction