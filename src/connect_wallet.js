export async function connect_wallet () {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
      } else {
        if (window.keplr.experimentalSuggestChain) {
          try {
            // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
            // cosmoshub-3 is integrated to Keplr so the code should return without errors.
            // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
            // If the user approves, the chain will be added to the user's Keplr extension.
            // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
            // If the same chain id is already registered, it will resolve and not require the user interactions.
            await window.keplr.experimentalSuggestChain({
              // Chain-id of the Osmosis chain.
              chainId: "qube-devnet-1",
              // The name of the chain to be displayed to the user.
              chainName: "Qube Devnet",
              // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
              rpc: "http://46.183.163.240:26657",
              // REST endpoint of the chain.
              rest: "http://46.183.163.240:443",
              chainSymbolImageUrl: "https://apricot-grubby-booby-751.mypinata.cloud/ipfs/QmfJEqcjheC56qrs9cpW86RaGUW2xsJrB1suGWoZJScbXc",
              // Staking coin information
              stakeCurrency: {
                // Coin denomination to be displayed to the user.
                coinDenom: "QUBE",
                // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                coinMinimalDenom: "uqube",
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                coinImageUrl: "https://apricot-grubby-booby-751.mypinata.cloud/ipfs/QmfJEqcjheC56qrs9cpW86RaGUW2xsJrB1suGWoZJScbXc",
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
              },
              // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
              // The 'stake' button in Keplr extension will link to the webpage.
              // walletUrlForStaking: "",
              // The BIP44 path.
              bip44: {
                // You can only set the coin type of BIP44.
                // 'Purpose' is fixed to 44.
                coinType: 560,
              },
              // Bech32 configuration to show the address to user.
              // This field is the interface of
              // {
              //   bech32PrefixAccAddr: string;
              //   bech32PrefixAccPub: string;
              //   bech32PrefixValAddr: string;
              //   bech32PrefixValPub: string;
              //   bech32PrefixConsAddr: string;
              //   bech32PrefixConsPub: string;
              // }
              bech32Config: {
                bech32PrefixAccAddr: "qube",
                bech32PrefixAccPub: "qubepub",
                bech32PrefixValAddr: "qubevaloper",
                bech32PrefixValPub: "qubevaloperpub",
                bech32PrefixConsAddr: "qubevalcons",
                bech32PrefixConsPub: "qubevalconspub",
              },
              // List of all coin/tokens used in this chain.
              currencies: [
                {
                  coinDenom: "QUBE",
                  coinMinimalDenom: "uqube",
                  coinDecimals: 6,
                  coinImageUrl: "https://apricot-grubby-booby-751.mypinata.cloud/ipfs/QmfJEqcjheC56qrs9cpW86RaGUW2xsJrB1suGWoZJScbXc",
                },
                {
                  coinDenom: "USQ",
                  coinMinimalDenom: "uusd",
                  coinDecimals: 6,
                  coinImageUrl: "https://apricot-grubby-booby-751.mypinata.cloud/ipfs/QmcfLWPcB5MXxzc21jBktVVgnuXoCWNE5t19MUmLtdWSuw",
                },
                {
                  coinDenom: "ATOM",
                  coinMinimalDenom: "factory/qube1rya7pgk3tfnl4jtdeyasygqrrgxscg3h6en04s/uatom",
                  coinDecimals: 6,
                  coinImageUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
                },
              ],
              // List of coin/tokens used as a fee token in this chain.
              feeCurrencies: [
                {
                  // Coin denomination to be displayed to the user.
                  coinDenom: "QUBE",
                  // Actual denom (i.e. uosmo, uscrt) used by the blockchain.
                  coinMinimalDenom: "uqube",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  coinImageUrl: "https://apricot-grubby-booby-751.mypinata.cloud/ipfs/QmfJEqcjheC56qrs9cpW86RaGUW2xsJrB1suGWoZJScbXc",
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                  // (Optional) This is used to set the fee of the transaction.
                  // If this field is not provided and suggesting chain is not natively integrated, Keplr extension will set the Keplr default gas price (low: 0.01, average: 0.025, high: 0.04).
                  // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                  // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                  gasPriceStep: {
                    low: 0.0025,
                    average: 0.025,
                    high: 0.04,
                  },
                },
              ],
            });
          } catch {
            alert("Failed to suggest the chain");
          }
        } else {
          alert("Please use the recent version of keplr extension");
        }
      }
    
      const chainId = "qube-devnet-1";
    
      // You should request Keplr to enable the wallet.
      // This method will ask the user whether or not to allow access if they haven't visited this website.
      // Also, it will request user to unlock the wallet if the wallet is locked.
      // If you don't request enabling before usage, there is no guarantee that other methods will work.
      await window.keplr.enable(chainId);
      console.log(await window.keplr.getKey(chainId))
      var nameWallet = await window.keplr.getKey(chainId)
      document.getElementById ('connectWalletbutton').textContent = nameWallet.name
    //   window.keplr.
}
