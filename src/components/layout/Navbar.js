import { useContext } from 'react';
import UserContext from '../../context/user-context.js';
import { AuthService } from '../../services';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
export default function Navbar() {
   const { user, isLoading, setUser } = useContext(UserContext);

   const history = useHistory();

   const handleLogout = async () => {
      try {
         const { data } = await AuthService.logout(user.accessToken);
         if (data.success) {
            console.log('success');
         }
         setUser(null);
         history.push('/login');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <nav className="rounded-b-md overflow-hidden bg-light bg-opacity-50 h-16 py-4 px-10 flex items-center justify-between z-10 shadow-lg fixed top-0 left-0 w-full">
         <Link
            className="cursor-pointer 
            relative
            
            font-semibold text-xl text-dark"
            to="/"
         >
            <img src={logo} className="w-64" alt="logo" />
            <span className="top-0 left-12 bg-clip-text text-transparent layered-background absolute font-logo">
               Feedbacks.
            </span>
         </Link>
         <ul className="flex space-x-4 justify-between font-medium tracking-wider items-center">
            <li>
               <Link to="/" className="nav-link">
                  Home
               </Link>
            </li>
            {!isLoading &&
               (user ? (
                  <>
                     <li>
                        <Link
                           className="nav-link capitalize"
                           to="/profile"
                        >{`${user.firstName} ${user.lastName}`}</Link>
                     </li>
                     <li>
                        <button className="nav-link" onClick={handleLogout}>
                           Logout
                        </button>
                     </li>
                  </>
               ) : (
                  <>
                     <li>
                        <Link className="nav-link" to="/login">
                           Login
                        </Link>
                     </li>
                     <li>
                        <Link className="nav-link" to="/register">
                           Register
                        </Link>
                     </li>
                  </>
               ))}
         </ul>
      </nav>
   );
}
