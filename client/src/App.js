import React, { useState, useEffect } from "react";
import WalletContract from "./contracts/WalletContract.json";
import getWeb3 from "./getWeb3";

import BlockchainContext from "./BlockchainContext";

import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Allowances from "./components/Allowances";



function App() {

  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState([])

  const [owner, setOwner] = useState(undefined);

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = WalletContract.networks[networkId];
        const contract = new web3.eth.Contract(
          WalletContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);


        // Verify Owner
        const ownerAddress = await contract.methods.getOwner().call();
        setOwner(ownerAddress);

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert("Failed to load web3. Check console for details.");
        console.error(error);
      }
    }

    init();
  }, [web3, accounts, contract]);



  
  if(typeof(web3) === 'undefined') {
    return <div>Loading WEB3...</div>
  }
  return (
    <BlockchainContext.Provider value={{ web3, accounts, contract, owner }}>
      <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Info} />
            <Route path='/deposit' component={Deposit} />
            <Route path='/withdraw' component={Withdraw} />
            <Route path='/allowances' component={Allowances} />
          </Switch>
          <Footer />
      </Router>
    </BlockchainContext.Provider>
  )

}


export default App;
