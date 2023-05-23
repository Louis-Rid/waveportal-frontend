import React, { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Wave from "./components/Wave";
import abi from "./utils/WavePortal.json";
import { ethers } from "ethers";
import TextAndImage from "./components/TextAndImage";
import MessageHistory from "./components/MessageHistory";
import GetWaveCount from "./components/GetWaveCount";

// -- Functions for connecting to wallet and contract --

// ----- Component -----

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const contractAddress = "0xb11cCAae08A443D69b9BC5eEE03727DBAe05a76f";
  const { ethereum } = window;
  const contractABI = abi.abi;

  const findMetaMaskAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    try {
      if (!ethereum) {
        console.log("Make sure you have metamask");
        return null;
      }

      if (accounts.length !== 0) {
        const account = accounts[0];
        getAllWaves();
        return account;
      } else {
        console.log(`No authorized account found`);
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getAllWaves = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractABI = abi.abi;
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // Call getAllWaves() function from contract
        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.wave,
            timesstamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let wavePortalContract;

    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves((prevState) => [
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
        ...prevState,
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);

      return () => {
        if (wavePortalContract) {
          wavePortalContract.off("NewWave", onNewWave);
        }
      };
    }
  }, []);

  const styles = {
    appContainer: "container mx-auto bg-sky-300 p-10 prose prose-zinc",
    input:
      "mt-1 ps-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0",
    darkButton:
      "bg-sky-950 text-white w-6/12 m-auto rounded-full mt-3 inline-block",
    lightButton:
      "bg-sky-300 text-white w-6/12 m-auto rounded-full mt-3 inline-block",
  };

  return (
    <div className={styles.appContainer}>
      <div className="flex flex-col">
        <h1 className="mb-0">👋 Hey there! My name is Louis!</h1>

        <p>
          I am a Web3 developer and really enjoy building decentralized
          applications. Connect your wallet and send me a message! (There is
          also a small chance you could win some ETH🤫)
        </p>
        <label htmlFor="message">
          <input
            id="message"
            className={styles.input}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message 😁"
          />
        </label>
        {currentAccount ? (
          <Wave
            contractAddress={contractAddress}
            abi={contractABI}
            message={message}
            styles={styles.darkButton}
          />
        ) : (
          <ConnectWallet
            ethereum={ethereum}
            setCurrentAccount={setCurrentAccount}
            styles={styles.darkButton}
          />
        )}
        <TextAndImage />
        <GetWaveCount
          abi={contractABI}
          contractAddress={contractAddress}
          styles={styles}
        />
        <MessageHistory allWaves={allWaves} />
      </div>
    </div>
  );
}

export default App;
