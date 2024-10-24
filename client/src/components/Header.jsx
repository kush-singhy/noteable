import React from "react";
import logo from '../assets/book-line.png'

function Header() {
    return (
        <div class="header">
            <div class="header-content">
                <div class="logo-box">
                    <img src={logo} class="logo" alt="Logo" />
                </div>
                <div class="title">Noteable</div>
                <div class="nav-links">
                    <a href="/">Notes</a>
                    <a href="/wishlist">Wishlist</a>
                </div>
                <div class="add-book">
                    <a href="/add" class="btn add-book-btn">Add Book</a>
                </div>
            </div>
        </div>
    )
}

export default Header;