import React from "react";
import logo from '../assets/book-line.png'

function Header() {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo-box">
                    <img src={logo} className="logo" alt="Logo" />
                </div>
                <div className="title">Noteable</div>
                <div className="nav-links">
                    {/* <a href="/">Notes</a>
                    <a href="/wishlist">Wishlist</a> */}
                </div>
                <div className="add-book">
                    <a href="/add" className="btn add-book-btn">Add Book</a>
                </div>
            </div>
        </div>
    )
}

export default Header;