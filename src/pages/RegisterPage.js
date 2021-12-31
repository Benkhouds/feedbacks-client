import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../context/user-context';
import { AuthService } from '../services';
import { Link, Redirect } from 'react-router-dom';
import { Layout, FormTitle, Input, FormButton } from '../components';
import registerValidation from '../validations/registerValidation';

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
   const { user, setUser, isLoading: userLoading } = useContext(UserContext);

   const registerHandler = async (values, setSubmitting, setStatus) => {
      const { username, firstName, lastName, email, password } = values;
      setSubmitting(true);

      const statusToast = toast.loading('Please wait...', options);

      try {
         const { data } = await AuthService.register(
            username,
            firstName,
            lastName,
            email,
            password
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
            }, 2000);
         }
      } catch (err) {
         setStatus(err.response?.data?.error);
         toast.update(statusToast, {
            render: 'Email already exists',
            autoClose: 1000,
            type: 'error',
            closeButton: true,
            isLoading: false,
         });
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

            <div className="w-2/5 mt-4 mx-auto bg-white overflow-hidden flex shadow  sm:rounded md:rounded-lg">
               <Formik
                  initialValues={{
                     firstName: '',
                     lastName: '',
                     username: '',
                     email: '',
                     password: '',
                     confirmPassword: '',
                  }}
                  validationSchema={registerValidation}
                  onSubmit={(values, { setSubmitting, setStatus }) =>
                     registerHandler(values, setSubmitting, setStatus)
                  }
               >
                  {({ isSubmitting, isValid, status }) => (
                     <div className="w-full px-8 my-10">
                        <FormTitle text="Register" />
                        <Form className=" py-4">
                           <div className="flex space-x-4">
                              <Input
                                 status={status}
                                 label="First Name"
                                 name="firstName"
                                 type="text"
                              />
                              <Input
                                 status={status}
                                 label="Last Name"
                                 name="lastName"
                                 type="text"
                              />
                           </div>

                           <Input
                              status={status}
                              label="Username"
                              name="username"
                              type="text"
                           />
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
                           <Input
                              status={status}
                              label="Confirm Password"
                              name="confirmPassword"
                              type="password"
                           />
                           <div className="flex items-center justify-between mt-4">
                              <div>
                                 <span className="text-gray-400 text-sm">
                                    Already have an account?{' '}
                                    <Link
                                       to="/login"
                                       className="font-bold text-dark hover:underline"
                                    >
                                       Login
                                    </Link>
                                 </span>
                              </div>
                              <FormButton
                                 disabled={!isValid || isSubmitting}
                                 className="bg-dark px-5 focus:ring-2 focus:ring-offset-2 focus:ring-dark "
                              >
                                 Register
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
