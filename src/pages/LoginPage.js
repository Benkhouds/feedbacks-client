import { useContext } from 'react';
import { AuthService } from '../services';
import UserContext from '../context/user-context';
import { Link, Redirect } from 'react-router-dom';
import loginValidation from '../validations/loginValidation';
import { Layout, FormTitle, Input, FormButton } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';

const options = {
   position: 'top-center',
   autoClose: 2000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};
export default function RegisterPage({ history }) {
   const { isLoading: userLoading, user, setUser } = useContext(UserContext);

   const loginHandler = async (values, setSubmitting, setStatus) => {
      setSubmitting(true);
      const statusToast = toast.loading('Please wait...', options);
      // simulating bad internet connexion
      try {
         const { data } = await AuthService.login(
            values.email,
            values.password
         );
         if (data.success) {
            setTimeout(() => {
               toast.update(statusToast, {
                  render: 'All is good',
                  autoClose: 1000,
                  type: 'success',
                  closeButton: true,
                  isLoading: false,
               });
            }, 1000);
            setTimeout(() => {
               setUser(data.user);
               history.push('/');
            }, 2000);
         }
      } catch (err) {
         setTimeout(() => {
            if (err.response?.data?.error) {
               setStatus({
                  error: err.response?.data?.error,
               });
               toast.update(statusToast, {
                  render: err.response?.data?.error,
                  type: 'error',
                  autoClose: 2000,
                  closeButton: true,
                  isLoading: false,
               });
            } else {
               setStatus({
                  error: 'Internal Server Error',
               });
               toast.update(statusToast, {
                  render: 'Internal Server Error',
                  type: 'error',
                  autoClose: 2000,
                  closeButton: true,
                  isLoading: false,
               });
            }
         }, 2000);
      } finally {
         setSubmitting(false);
      }
   };

   if (userLoading) {
      return <div>Page Loader ...</div>;
   } else if (user) {
      return <Redirect to="/" />;
   } else {
      return (
         <Layout>
            <ToastContainer
               position="top-center"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               draggable
            />

            <div className="w-2/5 mt-8 mx-auto bg-white py-10 overflow-hidden flex shadow  sm:rounded md:rounded-lg">
               <Formik
                  initialValues={{
                     email: '',
                     password: '',
                  }}
                  validationSchema={loginValidation}
                  onSubmit={(values, { setSubmitting, setStatus }) =>
                     loginHandler(values, setSubmitting, setStatus)
                  }
               >
                  {({ isSubmitting, isValid, status }) => (
                     <div className="w-full px-8">
                        <FormTitle text="Login" />
                        <Form className=" py-4">
                           <Input
                              status={status}
                              label="Email"
                              name="email"
                              type="email"
                           />
                           <Input
                              status={status}
                              label="Password"
                              name="password"
                              type="password"
                           />
                           <div className="flex items-center justify-between mt-4">
                              <div>
                                 <p className="text-gray-400 text-sm mb-1">
                                    Create an account :
                                    <Link
                                       to="/register"
                                       className="font-bold text-dark hover:underline"
                                    >
                                       Register
                                    </Link>
                                 </p>
                                 <span className="text-gray-400 text-sm">
                                    Forgot Password :
                                    <Link
                                       to="/resetPassword"
                                       className="font-bold text-dark hover:underline"
                                    >
                                       Reset Password
                                    </Link>
                                 </span>
                              </div>
                              <FormButton
                                 disabled={!isValid || isSubmitting}
                                 className="bg-dark px-5 focus:ring-2 focus:ring-offset-2 focus:ring-dark "
                              >
                                 Login
                              </FormButton>
                           </div>
                        </Form>
                     </div>
                  )}
               </Formik>
            </div>
         </Layout>
      );
   }
}
