import { useEffect, useState , useContext } from "react";
import { Link } from "react-router-dom";
import { LightBulbIcon } from "@heroicons/react/solid";

import axios from 'axios'
import Layout from "../components/layout/Layout";
import { Button , Feedback} from "../components";
import { DataService } from '../services'
import UserContext from '../context/user-context';

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 const { user } = useContext(UserContext)
  //extract in useFeedbacksFetch hook
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
   
          const { data } = await DataService.getPublicContent(source.token, user ? user.accessToken :'')
          if (data.success) {
          console.log(data.feedbacks)
          setFeedbacks(data.feedbacks);
        } else {

          setError("error fetching data");
        }
      } catch (err) {
        if(axios.isCancel(err)) return;
        setError("error fetching data");
      }
      setIsLoading(false);
    };

    fetchFeedbacks();

    return ()=>{
       source.cancel()
    }
  }, [user]);

    return (
      <Layout>
        <div className="grid grid-cols-10 gap-8 px-16">

          <div className=" col-start-2 space-y-5 col-span-2">
            <div className="intro h-32 bg-gray-800 rounded-lg py-6 px-6 ">
              <p className="text-white font-bold text-left">Front end Mentor</p>
              <p className="text-white text-left opacity-70">Feedback Board</p>
            </div>

            <div className="flex flex-wrap bg-white rounded-lg px-5 py-4 space-x-1">
              {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map(
                (cat, i, arr) => {
                  return <Button key={i} text={cat} className={"bg-indigo-50 text-blue-800 hover:border-indigo-700 my-1"} />;
                }
              )}
            </div>
            <div className="bg-white rounded-lg px-6 py-6 ">
              <p className="text-black font-bold font-mono mb-4">RoadMap</p>
              <div className="space-y-3">
                <p className="text-sm">Planned</p>
                <p className="text-sm">In Progress</p>
                <p className="text-sm">Live</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 space-y-5">
            <div className="">
              <div className="flex flex-col justify-between bg-gray-800 items-center h-16 border-solid rounded-lg md:flex-row px-4">
                <div className="block md:flex-row">
                  <LightBulbIcon className="w-10 h-5 text-white inline-block " />
                  <p className="font-serif text-white inline-block ">
                    0 Suggestions
                  </p>
                </div>
                <Link
                  to="/create"
                  className="py-2 px-4 bg-gray-100 text-gray-800 focus:outline-none hover:border-gray-100 border-2 border-transparent  hover:bg-gray-800 transition duration-300  hover:text-white rounded-lg "
                >
                  + Add Feedback
                </Link>
              </div>
            </div>

            <div className=" rounded-lg ">
              <div className="">
                {error && <div>{error}</div>}
                {isLoading && <div>data loading</div>}
                {!isLoading &&
                  !error &&
                  feedbacks.length &&
                  feedbacks.map((feedback) => (
                    <Feedback 
                       feedback={feedback} 
                       key={feedback._id}
                    />
                  ))}
                {!isLoading && !error && !feedbacks.length && (
                  <div>No data page</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  
}

export default HomePage;
