import Icon from '../../assets/illustration-empty.svg';
import { Link } from 'react-router-dom';
function NoData() {
   return (
      <div className="bg-white flex justify-center items-center py-20 px-36">
         <div className="flex flex-col items-center text-center my-4">
            <img src={Icon} className="mb-12" alt="no data illustration" />
            <div className="mb-10">
               <h3 className="font-bold text-2xl mb-4">
                  There is no feedback yet.
               </h3>
               <p className="text-gray-500">
                  Got a suggestion? Found a bug that needs to be squashed?
                  <br />
                  We love hearing about new ideas to improve our app.
               </p>
            </div>
            <Link
               to="/create"
               className="py-2 px-4 bg-violet text-gray-50 focus:outline-none hover:border-gray-100 border-2 border-transparent  hover:bg-opacity-80 transition duration-300  hover:text-white rounded-lg "
            >
               + Add Feedback
            </Link>
         </div>
      </div>
   );
}

export default NoData;
