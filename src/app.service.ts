import { HttpService, Injectable } from '@nestjs/common';
import * as bitcoin from 'bitcoinjs-lib';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  createAddress() {
    const testnet = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: testnet,
    });
    const wif = keyPair.toWIF();

    return {
      code: address,
      secret: {
        wif,
      },
    };
  }

  sendMultiple() {
    const testnet = bitcoin.networks.testnet;
    const tx = new bitcoin.TransactionBuilder(testnet);

    // ((148 * inCount) + (34 * outCount) + 10 + inCount) = Transaction Size
    // 140 standard fee per byte
    const fee = (148 + 4 * 34 + 10 + 1) * 140; // TransactionSize * feePerByte

    tx.addInput(
      '88699817a95e42ddf676fd8ed87a1c6b7e7bd24132e5bc6b9c70fa9b4df9011f',
      0,
    );

    tx.addOutput('mm12bvvYBRRnLK9JkuevWCTinti69pepT7', 100000);
    tx.addOutput('mm12bvvYBRRnLK9JkuevWCTinti69pepT7', 100000);
    tx.addOutput('mfm9XNo7LkKxBrPw7uAWkxtnHpbCF7dKqj', 100000);
    tx.addOutput('mtEbQUZDTuF4VGAMSsW5WgjNSLbS1whcaH', 700000 - fee); // change

    const keyPair = bitcoin.ECPair.fromWIF(
      '',
      testnet,
    );

    tx.sign(0, keyPair);
    return tx.build().toHex();
  }
}
