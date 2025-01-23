
import React from 'react';
import logo from '/images/my4.png'; // Assuming the logo path is correct
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
    const { loginWithRedirect,isAuthenticated, logout,user } = useAuth0();

    return (
        <header className='h-16 shadow-sm flex items-center'>
            <nav className='flex justify-between items-center w-9/12 mx-auto'>
                <a href='/'><img className='w-12' src={logo} alt='logo' /></a>
                <div className='flex items-center space-x-5'>
                    <ul className='sm:flex items-center space-x-5 hidden'>
                        <li>
                            <a href='/'>Features</a>
                        </li>
                        <li>
                            <a href='/'>About us</a>
                        </li>

                        <li>
                            { isAuthenticated &&  <p>
                                {user.name}
                            </p>}
                        </li>

                        <li>
                            {isAuthenticated ? (
                                <li>
                                    <button className='font-medium px-5 py-1 border border-[#0b7a96] rounded hover:bg-[white] hover:text-black transition-all duration-300 ease-in' onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
                                </li>
                            ) : (
                                <li>
                                    <button className='font-medium px-5 py-1 border border-[#0b7a96] rounded hover:bg-[white] hover:text-black transition-all duration-300 ease-in' onClick={() => loginWithRedirect()}>Log In</button>
                                </li>
                            )}    
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
