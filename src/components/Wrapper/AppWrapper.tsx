import React from 'react'
import Sidebar from '../shared/Sidebar'

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='text-white flex gap-4'>
            <div className='w-1/2 md:w-75'>
                <Sidebar></Sidebar>
            </div>
            <div>
                {children}
            </div>
        </main>
    )
}

export default AppWrapper
