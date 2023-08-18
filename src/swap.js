import {
    assertIsBroadcastTxSuccess,
    SigningStargateClient,
  } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";



const denom1 = 'factory/qube1rya7pgk3tfnl4jtdeyasygqrrgxscg3h6en04s/uatom'
const denom2 = 'uusd'

export async function swap () {
    const chainId = "qube-devnet-1";
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log(accounts)

    const network = {
      url: 'https://cors-anywhere.herokuapp.com/http://46.183.163.240:26657',
      /*headers: {
        //'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
        'Accept,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With',
        'Access-Control-Methods': 'GET, POST, OPTION',
        'Access-Control-Allow-Origin': 'http://localhost:8081',
        'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
        'Access-Control-Max-Age': '1728000',
      },*/
    }
    const client = await SigningStargateClient.connectWithSigner(
      network,
      offlineSigner,
    );
    // const MsgMint = new Type("MsgMint")
    //     .add(new Field("creator", 1, "string"))
    //     .add(new Field("amountInt", 2, "string"))
    //     .add(new Field("denomOut", 3, "string"));

    // const MsgBurn = new Type("MsgBurn")
    //     .add(new Field("creator", 1, "string"))
    //     .add(new Field("amountInt", 2, "string"))
    //     .add(new Field("denomOut", 3, "string"));

    const typeUrlMsgMint = "/core.stable.v1beta1.MsgMint";
    const typeUrlMsgBurn = "/core.stable.v1beta1.MsgBurn";
    client.registry.register(typeUrlMsgMint,{creator,amountInt,denomOut})
}