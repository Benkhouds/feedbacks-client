import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { ChevronUpIcon, MessageIcon } from '../';
import { DataService } from '../../services';
import { useContext, useState, useRef } from 'react';
import UserContext from '../../context/user-context';
import { useHistory } from 'react-router-dom';

function RoadmapCard({ feedback, color, status }) {
   const [upVotes, setUpVotes] = useState(feedback.voteScore);
   const [liked, setLiked] = useState(feedback.liked);
   const { user } = useContext(UserContext);
   const history = useHistory();
   const titleRef = useRef();
   console.log(titleRef.current);

   async function handleUpVote(_) {
      if (user) {
         try {
            const { data } = await DataService.upVote(
               feedback._id,
               user.accessToken
            );
            setLiked(data.liked);
            setUpVotes(data.voteScore);
         } catch (err) {
            console.log(err);
         }
      } else {
         history.push('/login');
      }
   }
   //TODO:extract the ui to different component (roadmapCard and FeedbackCard
   //The Feedback component should handle the redundant logic )
   return (
      <div
         className={`w-full rounded-md p-6 mb-4 bg-white  border-t-4 border-${color}`}
      >
         <div>
            <p className="text-sm flex items-center mb-3">
               <span
                  className={`block w-2 h-2 text-black rounded-full mr-4 bg-${color}`}
               ></span>
               <span className="capitalize">{status}</span>
            </p>
            <h1>
               <Link
                  ref={titleRef}
                  to={'/feedbacks/' + feedback._id}
                  className="font-bold text-lg text-gray-800 hover:underline mb-2 block w-full truncate"
               >
                  {feedback.title}
               </Link>
            </h1>
            <p className="text-gray-500 mb-3 text-sm h-16">
               {feedback.details}
            </p>
            <Button
               className="bg-indigo-50  text-blue-700 capitalize  rounded-lg hover:border-indigo-700 hover:bg-indigo-50 hover:text-blue-700 py-1"
               text={feedback.category}
               class
            />
         </div>

         <div className="flex items-center justify-between mt-3">
            <button
               onClick={handleUpVote}
               className={
                  ' flex items-center text-sm  text-center cursor-pointer bg-indigo-50 px-3 py-2 rounded-lg border-2 border-transparent  hover:border-indigo-500 ' +
                  (liked ? 'bg-indigo-300 text-white' : '')
               }
            >
               <ChevronUpIcon
                  className={liked ? 'text-white' : 'text-blue-700 '}
                  size="h-3 w-3"
               />
               <span className="font-bold ml-2 ">{upVotes}</span>
            </button>

            <span className="font-bold text-sm flex items-center ">
               <MessageIcon />
               {feedback.commentsCount}
            </span>
         </div>
      </div>
   );
}

export default RoadmapCard;
