import React, { useContext, useRef } from 'react';
import BlockchainContext from '../BlockchainContext';

const Withdraw = () => {

    const Context = useContext(BlockchainContext);
    const { accounts, contract } = Context;

    const amountRef = useRef(null);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await contract.methods.withdrawFunds(
            amountRef.current.value
        ).send({
            from: accounts[0]
        });

        console.log(response);
    }

    return (
        <section className="container section-container">
            <h2>Withdraw</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">
                    <input
                        type="number"
                        placeholder="Amount (in Wei)"
                        ref={amountRef}
                    />
                </label><br />
                <input className="form-btn" type="submit" value="Withdraw" />
            </form>
        </section>
    )
}

export default Withdraw
