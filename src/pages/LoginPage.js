import { useState , useContext} from "react";
import { AuthService} from '../services'
import UserContext from '../context/user-context'
import { Link, Redirect } from "react-router-dom";
import { FormLayout, Layout, FormTitle, FormControl, FormButton } from '../components'


export default function RegisterPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading]= useState(false)
  const {isLoading: userLoading , user , setUser} = useContext(UserContext)

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const { data } = await AuthService.login( email, password ); 
      if (data.success) {
        setUser(data.user)
        history.push("/");
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || 'error has occurred');
    }finally{
      setIsLoading(false)
    }
  };



 if(userLoading){
   return <div>Page Loader ...</div>
 }
 else if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        <div className="w-1/3 mx-auto">
          <FormLayout onSubmit={loginHandler} >
            <FormTitle text='Login'/>
            {error && <span className="error-message">{error}</span>}

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
                placeholder="Enter your password"
                id="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            />
            <div className="flex items-end justify-between">
              <div className="mt-4">
                  {isLoading && <p>Loading...</p>}
                  <p className="text-gray-400 text-sm mb-1" >
                    Create an account : <Link to="/register" className="font-bold text-indigo-400 hover:underline">Register</Link>
                  </p>
                  <span className="text-gray-400 text-sm">
                    Forgot Password : <Link to="/resetPassword" className="font-bold text-indigo-400 hover:underline">Reset Password</Link>
                  </span>
              </div>
               <FormButton className="bg-black ">Login</FormButton>
            </div>
          </FormLayout>
        </div>
      </Layout>
    );
  }
}
