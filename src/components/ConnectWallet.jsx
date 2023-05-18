const ConnectWallet = ({ethereum, setCurrentAccount}) => {
    const connectWallet = async () => {
        try {
            if(!ethereum) {
                alert("You need to install metamask on your browser.")
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });

            console.log(`Connected ${accounts[0]}`)
            setCurrentAccount(accounts[0]);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
        </button>
    )
}

export default ConnectWallet;