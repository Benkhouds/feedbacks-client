import { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LightBulbIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import {
   Button,
   Feedback,
   SortByDropdown,
   NoData,
   FeedbackSkeleton,
} from '../components';
import { DataService } from '../services';
import UserContext from '../context/user-context';

function HomePage({ history }) {
   const [feedbacks, setFeedbacks] = useState([]);
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [category, setCategory] = useState('');
   const [sort, setSort] = useState('');
   const { user } = useContext(UserContext);
   //extract in useFeedbacksFetch hook

   useEffect(() => {
      if (category) history.push('/?category=' + category);
   }, [category, history]);

   useEffect(() => {
      const source = axios.CancelToken.source();

      const fetchFeedbacks = async () => {
         setIsLoading(true);
         try {
            const { data } = await DataService.getPublicContent(
               source.token,
               user ? user.accessToken : '',
               category !== 'all' ? category : '',
               sort
            );
            if (data.success) {
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
   }, [user, category, sort]);

   const isActive = useCallback(
      (elem) => {
         if ((!category && elem === 'all') || category === elem) {
            return 'bg-indigo-500 text-blue-50';
         } else {
            return 'text-blue-800';
         }
      },
      [category]
   );

   return (
      <Layout>
         <div className="grid grid-cols-10 gap-8 px-16">
            <div className=" col-start-2 space-y-5 col-span-2">
               <div className="intro h-32 bg-dark rounded-lg py-6 px-6 layered-background ">
                  <p className="text-white font-bold text-left">
                     Front end Mentor
                  </p>
                  <p className="text-white text-left opacity-70">
                     Feedback Board
                  </p>
               </div>

               <div className="flex flex-wrap bg-white rounded-lg p-4">
                  {['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'].map(
                     (cat, i) => {
                        return (
                           <Button
                              onClick={(e) =>
                                 setCategory(e.target.innerText.toLowerCase())
                              }
                              key={i}
                              text={cat}
                              className={
                                 'bg-indigo-50  hover:border-indigo-300 my-1 mr-2 py-2 ' +
                                 isActive(cat.toLowerCase())
                              }
                           />
                        );
                     }
                  )}
               </div>
               <div className="bg-white rounded-lg px-6 py-6 ">
                  <div className="flex justify-between">
                     <p className="text-black font-bold mb-4">Roadmap</p>
                     <Link
                        to="/roadmap"
                        className="text-blue-400 hover:underline text-sm"
                     >
                        View
                     </Link>
                  </div>
                  <div className="space-y-3">
                     <p className="text-sm flex items-center">
                        <span className="block w-2 h-2 text-black rounded-full bg-yellow-400 mr-4"></span>
                        <span>Planned</span>
                     </p>
                     <p className="text-sm flex items-center">
                        <span className="block w-2 h-2 text-black rounded-full bg-purple-600 mr-4"></span>
                        <span>In-Progress</span>
                     </p>
                     <p className="text-sm flex items-center">
                        <span className="block w-2 h-2 text-black rounded-full bg-blue-400 mr-4"></span>
                        <span>Live</span>
                     </p>
                  </div>
               </div>
            </div>
            <div className="col-span-6 space-y-5">
               <div className="">
                  <div className="flex justify-between items-center bg-dark  h-16  rounded-lg  px-4">
                     <div className="flex items-center">
                        <div className="mr-12">
                           <LightBulbIcon className="w-10 h-5 text-white inline-block " />
                           <p className="font-serif text-white inline-block ">
                              {feedbacks ? feedbacks.length : 0} Suggestions
                           </p>
                        </div>
                        <span className="text-white font-light text-opacity-70 text-sm mr-2">
                           Sort by :
                        </span>
                        <div>
                           <SortByDropdown
                              onChange={setSort}
                              value={sort}
                              options={[
                                 '',
                                 '-voteScore',
                                 'voteScore',
                                 '-commentsCount',
                                 'commentsCount',
                              ]}
                           />
                        </div>
                     </div>
                     <Link
                        to="/create"
                        className="py-2 px-4 bg-violet text-gray-50 focus:outline-none hover:border-gray-100 border-2 border-transparent  hover:bg-opacity-80 transition duration-300  hover:text-white rounded-lg "
                     >
                        + Add Feedback
                     </Link>
                  </div>
               </div>

               <div className=" rounded-lg overflow-hidden">
                  <div>
                     {error && <div>{error}</div>}
                     {isLoading &&
                        '123456'
                           .split('')
                           .map((v) => <FeedbackSkeleton key={v} />)}
                     {!isLoading && !error && feedbacks.length
                        ? feedbacks.map((feedback) => (
                             <Feedback
                                feedback={feedback}
                                commentsCount={feedback.commentsCount}
                                key={feedback._id}
                             />
                          ))
                        : ''}
                     {!isLoading && !error && !feedbacks.length && <NoData />}
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default HomePage;
