import {
    SigningStargateClient,
  } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import { MsgBurn, MsgMint } from "./proto/stable/tx.ts"

const denom1 = 'factory/qube1rya7pgk3tfnl4jtdeyasygqrrgxscg3h6en04s/uatom'
const denom2 = 'uusd'
const typeUrlMsgMint = "/core.stable.v1beta1.MsgMint";
const typeUrlMsgBurn = "/core.stable.v1beta1.MsgBurn";

function makeMintMsg(address, amount) {
        const msgMint = {
                creator: address,
                amountInt: (amount.toString()) + denom1,
                denomOut: denom2,
        };
        const msg = {
            typeUrl: typeUrlMsgMint,
            value: msgMint,
        };
        console.log(msg)
        return msg
}

function makeBurnMsg(address, amount) {
        const msgBurn = {
                creator: address,
                amountInt: (amount.toString()) + denom2,
                denomOut: denom1,
        };
        const msg = {
            typeUrl: typeUrlMsgBurn,
            value: msgBurn,
        };
        console.log(msg)
        return msg
}

export async function swap () {
        const chainId = "qube-devnet-1";
        await window.keplr.enable(chainId);
        if(document.getElementById ('connectWalletbutton').textContent != '') {
                const offlineSigner = window.getOfflineSigner(chainId);
                const accounts = await offlineSigner.getAccounts();

                const network = {
                        url: 'https://cors-anywhere.herokuapp.com/http://46.183.163.240:26657',
                }

                var reg = new Registry(defaultRegistryTypes)
                reg.register(typeUrlMsgMint, MsgMint)
                reg.register(typeUrlMsgBurn, MsgBurn)
                const client = await SigningStargateClient.connectWithSigner(
                        network,
                        offlineSigner,
                        {
                                registry: reg 
                        }
                );

                const fee = {
                        amount: [
                        {
                        denom: "uqube",
                        amount: "5000",
                        },
                        ],
                        gas: "200000",
                };

                var amount =  Number(document.getElementById('inputAmountIn').value)
                if ( amount != 0) {
                        var denom = document.getElementById('outputDenom').textContent 
                        var msg;
                        if (denom == 'USQ') {
                                msg = makeMintMsg(accounts[0].address, amount * 1000000 )
                        } else if (denom == 'ATOM') {
                                msg = makeBurnMsg(accounts[0].address, amount * 1000000 )
                        }

                        const result = await client.signAndBroadcast(
                                accounts[0].address,
                                [msg],
                                fee
                        );

                        if (result.code !== undefined && result.code !== 0) {
                                alert("Failed to send tx: " + result.log || result.rawLog);
                        } else {
                                alert("Succeed to send tx:" + result.transactionHash);
                        }
                        console.log(result.transactionHash)
                } else {
                        alert("Input amount");
                }
        } else {
                alert("Please, connect wallet");
        }
}