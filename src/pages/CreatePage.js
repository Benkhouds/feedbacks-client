import {
  Input,
  FormLayout,
  Layout,
  BackButton,
  AddIcon,
  FormTitle,
  FormControl,
  Label,
  ButtonsGroup,
  FormButton,
  TextArea,
  Dropdown,
  Button
} from '../components';
import { useState, useContext } from 'react';
import { DataService } from '../services';
import UserContext from '../context/user-context';
import { Formik, Form } from 'formik';
import feedbackValidation from '../validations/feedbackValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePage({ history }) {
  const [category, setCategory] = useState('Feature');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  async function handleSubmit(values, setSubmitting, setStatus) {
    console.log(values);
    console.log(category);
    setIsLoading(true);
    setSubmitting(true);
    try {
      const { data } = await DataService.addFeedback(
        values.feedbackTitle,
        category.toLowerCase(),
        values.details,
        user.accessToken
      );
      if (data.success) {
        setTimeout(() => {
          history.push('/');
        }, 500);
      }
    } catch (err) {
      toast({
        render: err.response?.data?.error || 'Error occurred, please try again',
        type: 'error',
        autoClose: 2000,
        closeButton: true,
        isLoading: false
      });
      setStatus({
        error: err.response?.data?.error || 'Error occurred, please try again'
      });

      setIsLoading(false);
    } finally {
      setSubmitting(true);
    }
  }

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
      <div className="w-1/3 mx-auto">
        <BackButton className="mb-8" />
        <FormLayout>
          <Formik
            initialValues={{
              feedbackTitle: '',
              details: ''
            }}
            validationSchema={feedbackValidation}
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(values, setSubmitting, setStatus)
            }
          >
            {({ isSubmitting, isValid, status }) => (
              <>
                <AddIcon />
                <FormTitle text="Create New Feedback" />
                <Form>
                  <FormControl>
                    <Label
                      subtitle="Add a short, description headline"
                      title="Feedback Title"
                    />

                    <Input status={status} name="feedbackTitle" type="text" />
                  </FormControl>

                  <FormControl>
                    <Label
                      id="category"
                      title="Category"
                      subtitle="Choose a category for your feedback"
                    />
                    <Dropdown
                      onChange={setCategory}
                      value={category}
                      options={['Feature', 'UI', 'UX', 'Enhancement', 'Bug']}
                    />
                  </FormControl>

                  <FormControl>
                    <Label
                      title="Feedback Detail"
                      subtitle="Include any specific comments on what should be improved, added,
                                  etc."
                      id="details"
                    />
                    <TextArea name="details" status={status} id="details" />
                  </FormControl>

                  <ButtonsGroup>
                    <Button
                      text="Cancel"
                      className="bg-indigo-200 "
                      onClick={() => {
                        history.push('/');
                      }}
                    />
                    <FormButton
                      disabled={!isValid || isSubmitting}
                      className="bg-gray-800 hover:bg-gray-600 flex items-center"
                    >
                      {isLoading ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-50 mr-2"></span>
                      ) : (
                        <span className="rounded-full w-5 border-gray-50 mr-2 font-semibold">
                          +
                        </span>
                      )}
                      Add Feedback
                    </FormButton>
                  </ButtonsGroup>
                </Form>
              </>
            )}
          </Formik>
        </FormLayout>
      </div>
    </Layout>
  );
}

export default CreatePage;
