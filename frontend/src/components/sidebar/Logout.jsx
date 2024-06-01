import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';

function Logout() {

  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto'>

      {
        !loading ? (<RiLogoutCircleLine className='bg-fuchsia-200 cursor-pointer w-6 h-6' onClick={logout} />)
          :
          (<span className='loading loading-spinner'></span>)
      }

    </div>
  )
}

export default Logout
