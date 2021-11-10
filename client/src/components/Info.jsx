import React, { useState, useContext } from 'react';
import BlockchainContext from '../BlockchainContext';


const Info = () => {

    // GET CONTEXT DATA
    const Context = useContext(BlockchainContext);
    const { accounts, contract, owner } = Context;

    const [balance, setBalance] = useState(undefined);


    const handleClick = async() => {
        const contractBalance = await contract.methods.getBalance().call();
        setBalance(contractBalance);
    }
    

    return (
        <div className="container section-container">
            <h2>Smart Contract Info</h2>
            <hr />
            <button className="btn" onClick={handleClick}><strong><i className="fas fa-sync-alt"></i>Fetch Data</strong></button>
            <div className="info">
                <p>Your address: {accounts[0]}</p>
                <p>Owner address: {owner}</p>
                <p>Contract balance: {balance}</p>
            </div>
        </div>
    )
}

export default Info
