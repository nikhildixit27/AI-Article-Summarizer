import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import logo from "../assets/logo.png"; // Import logo
import github from "../assets/github.svg";

function Header() {
    return (
        <header className="w-full flex justify-between items-center bg-white sm:px-8 py-4 px-4 border-b border-b-[#e6ebf4]">
            <Link to="/">
                <img src={logo} alt="App Logo" className="w-14 object-contain" />
            </Link>

            <div className='flex gap-x-4'>
                <Link to="https://text-to-image-nikhildixit27.vercel.app/" className='font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md'>
                    Text to Image
                </Link>
                
                <Link
                    to="https://github.com/nikhildixit27/AI-Article-Summarizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex border-black border-2 font-medium text-white px-2 py-2 rounded-md"
                >
                    <img src={github} alt="GitHub Repository" className="w-6 h-6 mx-1" />
                </Link>
            </div>

        </header>
    );
}

export default Header;
