import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

const Wave = ({contractAddress}) => {
    const wave = async () => {
        try {
          const { ethereum } = window;
      
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const contractABI = abi.abi;
            const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            
            // Check initial wave count
            let count = await wavePortalContract.getTotalWaves();
            console.log(`Retrieved toal wave count of ${count.toNumber()}`)

            // Execute wave() function from smart contract
            const waveTxn = await wavePortalContract.wave();
            console.log(`Mining -- ${waveTxn.hash}`);
            await waveTxn.wait(1);

            // Check wave count after completting a wave
            count = await wavePortalContract.getTotalWaves();
            console.log(`Retrieved toal wave count of ${count.toNumber()}`)
          } else {
            console.log(`Ethereum object doesn't exist.`)
          }
        } catch (e) {
          console.log(e);
        }
      }

    return (
        <button onClick={wave}>
            Wave!
        </button>
    )
}

export default Wave;