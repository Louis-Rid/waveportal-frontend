import { ethers } from "ethers";

const Wave = ({ contractAddress, abi, message, styles }) => {
  const wave = async () => {
    console.log(abi);
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

        // Check initial wave count
        let count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved toal wave count of ${count.toNumber()}`);

        // Execute wave() function from smart contract
        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        console.log(`Mining -- ${waveTxn.hash}`);
        await waveTxn.wait(1);

        // Check wave count after completting a wave
        count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved toal wave count of ${count.toNumber()}`);
      } else {
        console.log(`Ethereum object doesn't exist.`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button className={styles} onClick={wave}>
      Submit
    </button>
  );
};

export default Wave;
