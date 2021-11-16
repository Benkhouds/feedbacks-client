import {useContext} from 'react'
import UserContext from '../../context/user-context.js'
import {AuthService} from '../../services'
import {Link, useHistory} from 'react-router-dom'
 
 
export default function Navbar() {
 const {user,isLoading, setUser} = useContext(UserContext)

 const history = useHistory()
 
 const handleLogout = async()=>{
    try {
      const {data} = await AuthService.logout(user.accessToken)
      if(data.success){
         console.log('success')
      }
      setUser(null)
      history.push('/login')
      
    } catch (error) {
        console.log(error)
    }
 }


 return (
  <nav className="rounded-b-md overflow-hidden bg-gray-800 h-16 py-4 px-10 flex items-center justify-between z-10 shadow-lg fixed top-0 left-0 w-full">
     <Link className="cursor-pointer font-semibold  text-3xl text-gray-200" to="/">Product Feedback</Link>
     <ul className="flex  justify-between font-medium tracking-wider items-center">
        <li><Link to='/' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link></li>
        {!isLoading &&( user  ?
           <>
            <li><Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/profile" >{`${user.firstName} ${user.lastName}`}</Link></li>
            <li><button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"  onClick={handleLogout}>logout</button></li>
           </>
            :
            <>
             <li><Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/login'>Login</Link></li>
             <li><Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/register'>Register</Link></li>

            </>
         )
        }

     </ul>
  </nav>
 )
}
