import React, { useContext, useRef } from 'react';
import BlockchainContext from '../BlockchainContext';

const Allowances = () => {

    const Context = useContext(BlockchainContext);
    const { accounts, contract, owner } = Context;

    const addressRef = useRef(null);
    const amountAllowedRef = useRef(null);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await contract.methods.addAllowances(
            addressRef.current.value,
            amountAllowedRef.current.value
        ).send({
            from: accounts[0]
        });

        console.log(response);
    }

    return (
        <section className="container section-container">
            <h2>Allowances</h2>
            <hr />
            {
                accounts[0] !== owner ? <div className="danger">Not Allowed: you're not the owner</div> :
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="address">
                            <input
                                type="text"
                                placeholder="Address"
                                ref={addressRef}
                            />
                        </label><br />
                        <label htmlFor="amount">
                            <input
                                type="number"
                                placeholder="Amount (in Wei)"
                                ref={amountAllowedRef}
                            />
                        </label><br />
                        <input className="form-btn" type="submit" value="Submit" />
                        
                    </form>
                </div>
            }

        </section>
    )
}

export default Allowances
