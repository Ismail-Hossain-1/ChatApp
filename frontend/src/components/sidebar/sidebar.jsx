
import Conversations from './Conversations'
import Logout from './Logout'
import SearchInput from './searchInput'

function Sidebar() {
  return (
    <div>

        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        

        <Logout/>
    </div>
  )
}

export default Sidebar