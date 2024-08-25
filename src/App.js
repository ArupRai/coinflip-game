import { ThirdwebProvider, useMetamask, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useState } from 'react';

const CoinFlipGame = () => {
  const connectWithMetamask = useMetamask();
  const [betAmount, setBetAmount] = useState('');
  const [isHeads, setIsHeads] = useState(true);
  const [transactionHash, setTransactionHash] = useState('');

  const { contract } = useContract("your-contract-address");

  const flipCoin = async () => {
    const result = await contract.call('flipCoin', [isHeads], {
      value: ethers.utils.parseEther(betAmount),
    });
    setTransactionHash(result.transactionHash);
  };

  return (
    <div>
      <button onClick={connectWithMetamask}>Connect Wallet</button>
      <input 
        type="text" 
        placeholder="Bet Amount in ETH" 
        value={betAmount} 
        onChange={(e) => setBetAmount(e.target.value)} 
      />
      <button onClick={() => setIsHeads(true)}>Heads</button>
      <button onClick={() => setIsHeads(false)}>Tails</button>
      <button onClick={flipCoin}>Flip Coin</button>
      {transactionHash && <p>View on Etherscan: <a href={`https://goerli.etherscan.io/tx/${transactionHash}`}>Transaction</a></p>}
    </div>
  );
};

function App() {
  return (
    <ThirdwebProvider activeChain="goerli">
      <CoinFlipGame />
    </ThirdwebProvider>
  );
}

export default App;
