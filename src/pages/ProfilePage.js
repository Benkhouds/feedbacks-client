/* import {baseRoute} from '../config/http-common' */
import { useContext} from 'react'
import UserContext from '../context/user-context'


export default function ProfilePage() {
  
   const {user, isLoading: userLoading} = useContext(UserContext)


  

   return (
   <div>
      <h1>Profile</h1>
      {!userLoading && user && <p>{user.firstName}</p>}
      {!userLoading && user&& <p>{user.username}</p>}
   </div>
   )
}
