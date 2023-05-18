import React, {useEffect, useState} from "react";
import ConnectWallet from "./components/ConnectWallet";
import Wave from "./components/Wave";

// -- Functions for connecting to wallet and contract --



// ----- Component ----- 

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x7A8D9A02301dBEd800Dbc8672f08F146bbaA8E1e"
  const {ethereum} = window;

  const findMetaMaskAccount = async () => {
    const accounts = await ethereum.request({method: "eth_accounts"});
  
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask");
        return null;
      }
      
      console.log("We have the ethereum object", ethereum);
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log(`Found an authorized account: ${account}`);
        return account;
      } else {
        console.log(`No authorized account found`);
        return null;
      }
  
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    })
  }, [])

  return (
    <div className="container">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Louis, and I compete in martial arts. So that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        {currentAccount ?  <Wave contractAddress={contractAddress} /> : <ConnectWallet ethereum={ethereum} setCurrentAccount={setCurrentAccount} />}

        
      </div>
    </div>
  );
};


export default App;

        