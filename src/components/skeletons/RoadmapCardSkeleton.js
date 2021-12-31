function RoadMapCardSkeleton({ color, status }) {
   return (
      <div
         className={`w-full rounded-md p-6 mb-4 bg-white  border-t-4 border-${color}`}
      >
         <p className="text-sm flex items-center mb-3">
            <span
               className={`block w-2 h-2 text-black rounded-full mr-4 bg-${color}`}
            ></span>
            <span className="capitalize">{status}</span>
         </p>
         <div className="flex animate-pulse items-center w-full h-full justify-start space-x-5">
            <div className="w-full flex justify-between items-end">
               <div className=" w-11/12">
                  <div className="w-1/2 bg-indigo-100 h-5 rounded-md mb-4"></div>
                  <div className="w-3/4 bg-indigo-100 h-4 rounded-md mb-12"></div>
                  <div className="w-28 bg-indigo-100 h-8 rounded-md mb-4"></div>
                  <div className="w-16 bg-indigo-100 h-10 rounded-md "></div>
               </div>
               <div className="bg-indigo-100 rounded-full h-6 w-6"></div>
            </div>
         </div>
      </div>
   );
}

export default RoadMapCardSkeleton;
