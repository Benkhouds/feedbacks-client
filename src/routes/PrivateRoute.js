import {Route,  Redirect} from 'react-router-dom' 
import {useContext} from 'react'

import UserContext from '../context/user-context'

export default function PrivateRoute({component:Component, ...rest}) {

  const {user} = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={(props)=>{
          return (
            user  ?
          <Component {...props}/>
          :
          <Redirect to="/login" />
           )
        }
    }
    />
  )
}
