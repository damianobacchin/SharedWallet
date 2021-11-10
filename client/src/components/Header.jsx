import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="title">
                    <h1>
                        <i style={{marginRight: '10px'}} className="fas fa-wallet"></i>
                        ETH Shared Wallet
                    </h1>
                </div>
                <ul className="navbar">
                    <li><Link to="/deposit">Deposit</Link></li>
                    <li><Link to="/withdraw">Withdraw</Link></li>
                    <li><Link to="/allowances">Allowances</Link></li>
                    <li><Link to="/">Info</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header
