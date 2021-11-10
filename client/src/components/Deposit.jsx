import React, { useContext, useRef } from 'react';
import BlockchainContext from '../BlockchainContext';

const Deposit = () => {

    const Context = useContext(BlockchainContext);
    const { accounts, contract, owner } = Context;

    const depositAmountRef = useRef(null);


    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await contract.methods.addFunds().send({
            from: accounts[0],
            value: depositAmountRef.current.value
        });
        console.log(response);
    }

    return (
        <section className="container section-container">
            <h2>Deposit</h2>
            <hr />
            {
                owner !== accounts[0] ? <div className="danger">Not Allowed: you're not the owner</div> :
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            placeholder="Amount (in Wei)"
                            ref={depositAmountRef}
                        /><br />
                        <input className="form-btn" type="submit" value='Deposit' />
                    </form>
                </div>
            }
        </section>
    )
}

export default Deposit
