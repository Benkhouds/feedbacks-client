import { useState } from 'react';
import { FormButton, TextArea, CommentHeader } from '../';
import { Formik, Form } from 'formik';
function Comment({ comment, replyToComment }) {
   const [showReply, setShowReply] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   async function handleReply(values) {
      console.log(values);
      if (!values.reply.trim().length) return;
      setIsLoading(true);
      try {
         const data = await replyToComment(comment._id, values.reply);
         console.log(data);
         setIsLoading(false);
      } catch (err) {
         setIsLoading(false);
      } finally {
         setShowReply(false);
      }
   }
   return (
      <div className="w-full mb-8">
         <CommentHeader
            username={comment.author.username}
            lastName={comment.author.lastName}
            firstName={comment.author.firstName}
            onClick={() => setShowReply(!showReply)}
         />

         <div className="w-full pl-14 relative">
            <p className=" font-light text-gray-700 mb-6">{comment.content}</p>

            {comment.comments.length ? (
               <>
                  <span className="absolute h-full w-0.5 rounded bg-gray-100 top-0 left-4"></span>
                  {comment.comments.map((rep) => (
                     <div key={rep._id}>
                        <CommentHeader
                           username={rep.author.username}
                           lastName={rep.author.lastName}
                           firstName={rep.author.firstName}
                           onClick={() => {
                              console.log('not supported yet');
                           }}
                        />
                        <div className="pl-14">
                           <p className=" font-light  text-gray-700 mb-6">
                              {rep.content}
                           </p>
                        </div>
                     </div>
                  ))}
               </>
            ) : (
               ''
            )}

            <Formik initialValues={{ reply: '' }} onSubmit={handleReply}>
               {({ status, isValid, isSubmitting }) => (
                  <Form
                     className={
                        'mt-5 flex justify-between items-start ' +
                        (!showReply ? 'hidden' : '')
                     }
                  >
                     <TextArea
                        id="reply"
                        placeholder="Type your comment here"
                        name="reply"
                        status={status}
                     />

                     <FormButton
                        disabled={!isValid || isSubmitting}
                        className="bg-purple-500 text-white flex items-center whitespace-nowrap ml-4 mt-2"
                     >
                        {isLoading ? (
                           <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></span>
                        ) : (
                           <span className="rounded-full w-4  mr-2 font-semibold">
                              +
                           </span>
                        )}
                        Post Reply
                     </FormButton>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
}

export default Comment;
