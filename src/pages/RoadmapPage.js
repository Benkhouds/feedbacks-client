import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/user-context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DataService } from '../services';
import {
   Layout,
   BackButton,
   RoadmapCard,
   RoadmapCardHeader,
   RoadmapCardSkeleton,
} from '../components';
function RoadmapPage() {
   const [feedbacks, setFeedbacks] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState('');
   const { user } = useContext(UserContext);

   useEffect(() => {
      const source = axios.CancelToken.source();

      const fetchFeedbacks = async () => {
         try {
            const { data } = await DataService.getApprovedFeedbacks(
               source.token,
               user ? user.accessToken : ''
            );
            if (data.success) {
               console.log(data.feedbacks);
               setFeedbacks(data.feedbacks);
               setIsLoading(false);
            }
         } catch (err) {
            if (axios.isCancel(err)) return;
            setError('error fetching data');
            setIsLoading(false);
         }
      };

      fetchFeedbacks();

      return () => {
         source.cancel();
      };
   }, [user]);

   return (
      <Layout>
         <div className="w-2/3 mx-auto">
            <div className="flex justify-between items-center py-4 px-6 bg-dark  rounded-lg">
               <div>
                  <BackButton className="text-white" iconColor="text-white" />
                  <h1 className="text-xl font-bold text-white">Roadmap</h1>
               </div>
               <Link
                  to="/create"
                  className="py-2 px-4 bg-violet text-gray-50 focus:outline-none hover:border-gray-100 border-2 border-transparent  hover:bg-opacity-80 transition duration-300  hover:text-white rounded-lg "
               >
                  + Add Feedback
               </Link>
            </div>
            {error && <div>{error}</div>}
            <div className="mt-8 grid grid-cols-3 gap-6">
               {isLoading && (
                  <>
                     <div>
                        <RoadmapCardHeader
                           title="Planned"
                           description="Ideas prioritized for research"
                        />
                        {Array(3).fill(
                           <RoadmapCardSkeleton
                              color="yellow-400"
                              status="Planned"
                           />
                        )}
                     </div>
                     <div>
                        <RoadmapCardHeader
                           title="In-Progress"
                           description="currently being developed"
                        />
                        {Array(3).fill(
                           <RoadmapCardSkeleton
                              color="violet"
                              status="in progress"
                           />
                        )}
                     </div>
                     <div>
                        <RoadmapCardHeader
                           title="Live"
                           description="Released features"
                        />
                        {Array(3).fill(
                           <RoadmapCardSkeleton color="sky" status="live" />
                        )}
                     </div>
                  </>
               )}

               {!isLoading && !error && (
                  <>
                     <div>
                        <RoadmapCardHeader
                           title="Planned"
                           description="Ideas prioritized for research"
                           total={feedbacks.planned.length}
                        />
                        {feedbacks.planned.map((f) => {
                           return (
                              <RoadmapCard
                                 key={f._id}
                                 feedback={f}
                                 color="yellow-400"
                                 status="Planned"
                              />
                           );
                        })}
                     </div>
                     <div>
                        <RoadmapCardHeader
                           title="In-Progress"
                           description="currently being developed"
                           total={feedbacks.inProgress.length}
                        />
                        {feedbacks.inProgress.map((f) => {
                           return (
                              <RoadmapCard
                                 key={f._id}
                                 feedback={f}
                                 color="violet"
                                 status="in progress"
                              />
                           );
                        })}
                     </div>
                     <div>
                        <RoadmapCardHeader
                           title="Live"
                           description="Released features"
                           total={feedbacks.live.length}
                        />

                        {feedbacks.live.map((f) => {
                           return (
                              <RoadmapCard
                                 key={f._id}
                                 feedback={f}
                                 color="sky"
                                 status="live"
                              />
                           );
                        })}
                     </div>
                  </>
               )}
            </div>
         </div>
      </Layout>
   );
}

export default RoadmapPage;
