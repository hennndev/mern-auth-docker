import React from 'react'
import { Link } from 'react-router-dom'

const MainNavbar = () => {
    return (
        <header className='flex-between'>
            <h1 className='text-2xl font-bold'>MRNdocker</h1>
            <nav className='flexx space-x-5'>
                <Link to="/" className='text-gray-600 hover:text-blue-600 font-medium'>Homepage</Link>
                <Link to="/login" className='text-gray-600 hover:text-blue-600 font-medium'>Login</Link>
                <Link to="/register" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</Link>

            </nav>
        </header>
    )
}

export default MainNavbar