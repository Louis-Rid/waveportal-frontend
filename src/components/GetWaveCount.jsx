import { ethers } from "ethers";
import { useState } from "react";
const GetWaveCount = ({ contractAddress, abi, styles }) => {
  const [address, setAddress] = useState("");
  const [waveCountMessage, setSaveCountMessage] = useState("");
  const waveCountForAddress = async (address) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        const inputsMessage = await wavePortalContract.getTotalWavesForAddress(
          address
        );
        setSaveCountMessage(inputsMessage.toString());
      } else {
        setSaveCountMessage("You need to connect your wallet");
      }
    } catch (e) {
      console.log(e);
      setSaveCountMessage(
        "You haven't sent a message yet! Try sending one, then enter your address above."
      );
    }
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    waveCountForAddress(address);
  };
  return (
    <>
      <div className="bg-sky-950 p-4 text-white rounded mt-5">
        <h2 className="text-white mt-0 text-center">
          See how many times you have waved to me!
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="messageForAddress">
            <input
              id="messageForAddress"
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Wallet Address..."
            />
          </label>
          <input type="submit" className={styles.lightButton} />
        </form>
        <p>{waveCountMessage}</p>
      </div>
    </>
  );
};

export default GetWaveCount;
