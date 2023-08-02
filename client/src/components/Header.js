import React from 'react';
import Navigation from './Navigation';

function Header() {
    return (
        <header className="p-3 bg-dark text-white">
            <h1 className="mb-0">Video Lingo</h1>
            <Navigation />
        </header>
    );
}
export default Header;