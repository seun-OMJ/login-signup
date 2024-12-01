import React from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='header'><Header />
        <div className="outlet">{<Outlet />}</div></div>
        
    )
}
