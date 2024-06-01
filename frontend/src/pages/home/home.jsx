import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

function Home() {
    //console.log("home Called");
    return (
        <div className='flex sm:h-[450px] md:h-[550px]  rounded-lg overflow-hidden shadow-md bg-gray-500 bg-clip-padding backdrop-filter
        backdrop-blur-lg bg-opacity-0'>
            
            <Sidebar/>
            <MessageContainer/>

        </div>
    )
}

export default Home