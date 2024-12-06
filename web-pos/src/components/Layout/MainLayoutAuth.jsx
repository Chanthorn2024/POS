// import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayoutAuth() {
  return (
   
        <div>
            <div style={{ backgroundColor: "pink" }}>
                <h1>Login Page Layout</h1>
            </div>
        <div>
            <Outlet />
        </div>
    </div>

  )
}

export default MainLayoutAuth
