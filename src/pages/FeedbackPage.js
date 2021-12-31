import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user-context';
import axios from 'axios';
import { DataService } from '../services';
import { Link } from 'react-router-dom';
import {
   Layout,
   Feedback,
   BackButton,
   FormControl,
   Label,
   TextArea,
   FormButton,
   Comment,
} from '../components';
import { Formik, Form } from 'formik';
function FeedbackPage({ match, history }) {
   const { user } = useContext(UserContext);
   const [feedback, setFeedback] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState('');
   const [commentsList, setCommentsList] = useState([]);
   const [commentLoading, setCommentLoading] = useState(false);
   const [commentsCount, setCommentsCount] = useState(0);
   const [commentLength, setCommentLength] = useState(250);
   useEffect(() => {
      const source = axios.CancelToken.source();

      const fetchFeedback = async () => {
         if (!user) {
            history.push('/login');
         }
         try {
            const { data } = await DataService.getFeedback(
               match.params.id,
               source.token,
               user.accessToken
            );
            if (data.success) {
               console.log(data.feedback);
               setFeedback(data.feedback);
               setCommentsCount(data.feedback.commentsCount);
               setCommentsList(data.feedback.comments);
               setIsLoading(false);
            }
         } catch (err) {
            if (axios.isCancel(err)) return;
            setError('error fetching data');
            setIsLoading(false);
         }
      };

      fetchFeedback();

      return () => {
         source.cancel();
      };
   }, [user, match, history]);

   async function postComment(values, { resetForm }) {
      if (!values.comment.trim().length) return;
      setCommentLoading(true);
      try {
         const { data } = await DataService.addComment(
            feedback._id,
            values.comment,
            user ? user.accessToken : history.push('/login')
         );
         if (data.success) {
            setCommentsCount(data.commentsCount);
            const author = {
               username: user.username,
               firstName: user.firstName,
               lastName: user.lastName,
            };
            setCommentsList([
               { ...data.comment, comments: [], author },
               ...commentsList,
            ]);
         }
         setCommentLoading(false);
      } catch (err) {
         setError('error posting the comment');
         setCommentLoading(false);
      } finally {
         resetForm();
      }
   }

   async function replyToComment(commentId, reply) {
      try {
         const { data } = await DataService.reply(
            feedback._id,
            commentId,
            reply,
            user ? user.accessToken : history.push('/login')
         );
         if (data.success) {
            setCommentsCount(data.commentsCount);
            const newList = commentsList.map((c) => {
               if (c._id === commentId) return data.comment;
               return c;
            });
            setCommentsList(newList);
            return 'finished';
         }
      } catch (err) {
         setError('error posting the reply');
         return 'finished';
      }
   }

   return (
      <Layout>
         <div className="py-4 w-1/2 mx-auto">
            <div className="flex justify-between items-center mb-8">
               <BackButton />
               {!isLoading &&
                  !error &&
                  feedback.author.username === user.username && (
                     <Link
                        to={'/edit/' + feedback._id}
                        className="py-2 px-4 bg-violet text-gray-50 focus:outline-none  ring-2 ring-transparent focus:ring-offset-2 focus:ring-violet   hover:bg-opacity-70 transition duration-300  hover:text-white rounded-lg "
                     >
                        Edit Feedback
                     </Link>
                  )}
            </div>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading ...</div>}
            {!error && !isLoading && (
               <Feedback feedback={feedback} commentsCount={commentsCount} />
            )}

            {!isLoading &&
               !error &&
               (commentsList.length ? (
                  <div className="bg-white px-8 py-6 rounded my-4">
                     <h3 className="font-semibold text-lg mb-4">
                        {commentsCount} Comments{' '}
                     </h3>
                     {commentsList.map((c) => (
                        <Comment
                           key={c._id}
                           comment={c}
                           replyToComment={replyToComment}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="p-2 bg-yellow-100 rounded w-max my-4 text-black text-sm font-medium">
                     No comment yet!
                  </div>
               ))}

            <div className="w-full px-6 py-4 bg-white rounded-md">
               <Formik initialValues={{ comment: '' }} onSubmit={postComment}>
                  {({ status, isValid, isSubmitting, handleChange }) => (
                     <Form>
                        <FormControl>
                           <Label
                              id="comment"
                              title="Add Comment"
                              className="font-semibold block mb-4"
                           />
                           <TextArea
                              id="comment"
                              name="comment"
                              status={status}
                              onChange={(e) => {
                                 handleChange(e);
                                 setCommentLength(250 - e.target.value.length);
                              }}
                              placeholder="Type your comment here"
                           />
                        </FormControl>
                        <div className="flex justify-between items-center">
                           <p className="text-sm text-gray-400">
                              {commentLength} Characters left
                           </p>

                           <FormButton
                              disabled={!isValid || isSubmitting}
                              className="bg-violet flex items-center text-gray-50  ring-2 ring-transparent focus:ring-offset-2 focus:ring-violet  hover:bg-opacity-70 transition duration-300 "
                           >
                              {commentLoading ? (
                                 <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                              ) : (
                                 <span className="rounded-full w-5  mr-2 font-semibold">
                                    +
                                 </span>
                              )}
                              Post Comment
                           </FormButton>
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </Layout>
   );
}

export default FeedbackPage;
