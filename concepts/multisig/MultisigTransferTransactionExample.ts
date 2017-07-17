import {
    AccountHttp, NEMLibrary, NetworkTypes, Address, Account, TransferTransaction, TimeWindow,
    EmptyMessage, MultisigTransaction, PublicAccount, TransactionHttp
} from "nem-library";
import {XEM} from "nem-library/dist/src/models/mosaic/XEM";
declare let process: any;

// Inicializate NEMLibrary for TEST_NET Network
NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

const privateKey: string = process.env.PRIVATE_KEY;
const multisigAccountPublicKey: string = process.env.MULTISIG_PUBLIC_KEY;

const cosignerAccount = Account.createWithPrivateKey(privateKey);

const transferTransaction = TransferTransaction.create(
    TimeWindow.createWithDeadline(),
    "TCFFOM-Q2SBX7-7E2FZC-3VX43Z-TRV4ZN-TXTCGW-BM5J",
    XEM(2),
    EmptyMessage
);

const multisigTransaction = MultisigTransaction.create(
    TimeWindow.createWithDeadline(),
    transferTransaction,
    PublicAccount.createWithPublicKey(multisigAccountPublicKey)
);

const transactionHttp = new TransactionHttp({domain: "104.128.226.60"});

const signedTransaction = cosignerAccount.signTransaction(multisigTransaction);

transactionHttp.announceTransaction(signedTransaction).subscribe( x => console.log(x));