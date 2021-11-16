import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user-context";
import axios from "axios";
import { DataService } from "../services";
import {
  Layout,
  Feedback,
  BackButton,
  Button,
  FormControl,
  Label,
  TextArea,
  FormButton,
  Comment,
  CommentWithReplies
} from "../components";

function FeedbackPage({ match, history }) {
  const { user } = useContext(UserContext);

  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(match.params.id);
  
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchFeedback = async () => {
      try {
        const { data } = await DataService.getFeedback(
          match.params.id,
          source.token,
          user ? user.accessToken : history.push("/login")
        );
        if (data.success) {
          //TODO: send the liked state from the server
          setFeedback(data.feedback);
          console.log(data.feedback)
          setIsLoading(false);
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("error fetching data");
        setIsLoading(false);
      }
    };

    fetchFeedback();

    return () => {
      source.cancel();
    };
  }, [user, match, history]);

  return (
    <Layout>
      <div className="py-4 w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          {!isLoading &&
            !error &&
            feedback.author.username === user.username && (
              <Button
                text="Edit Feedback"
                className="bg-indigo-400 text-white"
                onClick={(e) => console.log(e)}
              />
            )}
        </div>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading ...</div>}
        {!error && !isLoading && <Feedback feedback={feedback} />}

         {!isLoading && !error && 
            (
             feedback.comments.length ?
             <div className="bg-white p-4 rounded my-4">
                {feedback.comments.map((comment)=>{
                 if(comment.comments.length){
                    return <CommentWithReplies comment={comment}/>
                 }else{
                   return <Comment comment={comment} />
                 }
                })}
             </div>
             :
             <div className="p-2 bg-yellow-100 rounded w-max my-4 text-black text-sm font-medium">No comment yet!</div>
            )   
         }

        <div className="w-full px-6 py-4 bg-white rounded-md">
          <form onSubmit={(e)=>e.preventDefault()}>
            <FormControl>
              <Label
                id="comment"
                title="Add Comment"
                className="font-semibold block mb-4"
              />
              <TextArea placeholder="Type your comment here" />
            </FormControl>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">250 Characters left</p>
              <FormButton className="bg-purple-500 text-white">
                Post Comment
              </FormButton>
            </div>
          </form>
        </div>


      </div>
    </Layout>
  );
}

export default FeedbackPage;
