import {useState, useContext} from 'react'
import { AuthService } from '../services'
import {Link, Redirect} from 'react-router-dom'
import UserContext from '../context/user-context'
import { FormLayout, Layout, FormTitle, FormControl, FormButton } from '../components'

export default function RegisterPage({history}) {
  const {user , setUser, isLoading : userLoading} = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const registerHandler= async (e)=>{
    e.preventDefault()
    if(password !== confirmedPassword){
        setPassword('')
        setConfirmedPassword('')
        setTimeout(setError('') ,2000)
        setError('Passwords do not match')
        return 
    }
    setIsLoading(true)
    try {
        const {data} = await AuthService.register(username,firstName, lastName , email , password)
        if(data.success){
          setUser(data.user)
          history.push('/')
        }
    } catch (err) {
      setError(err.response?.data?.error || 'error has occurred')
        setIsLoading(false)
    }
  }

 
  if(userLoading){
    return <div>Page Loader ...</div>
  }
  else if(user){
    return <Redirect to="/"/>
 }
 else{
 return (
  <Layout>
  <div className="w-1/3 mx-auto">
    <FormLayout onSubmit={registerHandler}>
      <FormTitle text='Register'/>
      {error && <span className="error-message">{error}</span>}
      <div className='flex space-x-4'>
      <FormControl
          title="First Name"
          placeholder="Enter first name"
          id="fname"
          type="text"
          onChange={(e)=>setFirstName(e.target.value)}
          value={firstName}
      />
      <FormControl
          title="Last Name"
          placeholder="Enter last name"
          id="lname"
          type="text"
          onChange={(e)=>setLastName(e.target.value)}
          value={lastName}
      />

</div>
      <FormControl
          title="Username"
          placeholder="Enter username"
          id="username"
          type="text"
          onChange={(e)=>setUsername(e.target.value)}
          value={username}
      />
      <FormControl
          title="Email"
          placeholder="Enter your email"
          id="email"
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
      />
      <FormControl
          title="Password"
          placeholder="Enter password"
          id="password"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
      />
      <FormControl
          title="Confirm Password"
          placeholder="Confirm password"
          id="confirm-password"
          type="password"
          onChange={(e)=>setConfirmedPassword(e.target.value)}
          value={confirmedPassword}
      />
      <div className="flex items-end justify-between mt-6">
        <div>
            {isLoading && <p>Loading...</p>}
            <span className="text-gray-400 text-sm">
                Already have an account? <Link to="/login" className="font-bold text-blue-500 hover:underline">Login</Link>
            </span>
        </div>
         <FormButton className="bg-black ">Register</FormButton>
      </div>
    </FormLayout>
  </div>
</Layout>
)
  
}
}