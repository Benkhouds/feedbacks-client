import Button from "../ui/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronUpIcon, MessageIcon } from "../";
import { DataService } from "../../services";
import { useContext, useState } from "react";
import UserContext from "../../context/user-context";
import { useHistory } from "react-router-dom";

function Feedback({ feedback }) {
  const [upVotes, setUpVotes] = useState(feedback.voteScore);
  const [liked, setLiked] = useState(feedback.liked)
  const { user } = useContext(UserContext);
  const history = useHistory();
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
      history.push("/login");
    }
  }

  return (
    <div className="flex w-full rounded px-6 py-3 mb-4  bg-white">
      <button
        onClick={handleUpVote}
        className={"text-sm w-12 h-12 text-center cursor-pointer bg-indigo-50 px-2 pb-2 pt-1 rounded-lg border-2 border-transparent  hover:border-indigo-500 " + (liked ? 'bg-indigo-300 text-white' : '')}
      >
        <ChevronUpIcon className={liked ? 'text-white' : 'text-blue-600 '}/>
        <span className="font-bold">{upVotes}</span>
      </button>
      <div className="mr-auto ml-10">
        <h1>
          <Link
            to={"/feedbacks/" + feedback._id}
            className="font-bold text-lg text-gray-800 hover:underline "
          >
            {feedback.title}
          </Link>
        </h1>
        <p className="text-gray-500 mb-3">{feedback.details}</p>
        <Button
          className="bg-indigo-50 text-blue-700 capitalize  rounded-lg hover:border-indigo-700 hover:bg-indigo-50 hover:text-blue-700"
          text={feedback.category}
          class
        />
      </div>

      <div className="flex items-center">
        <MessageIcon />
        <span className="font-bold text-sm ">{feedback.comments.length}</span>
      </div>
    </div>
  );
}

Feedback.prototype = {
  upvotes: PropTypes.string,
  Text: PropTypes.string,
  Parag: PropTypes.string,
  butt: PropTypes.string,
  Comments: PropTypes.number,
};
export default Feedback;