function FeedbackSkeleton() {
   return (
      <div className="w-full rounded-md px-6 py-5 mb-4 bg-white">
         <div className="flex animate-pulse items-center w-full h-full justify-start space-x-5">
            <div className="p-2">
               <div className="w-14 bg-indigo-100 h-14 rounded-full "></div>
            </div>
            <div className="w-full flex justify-between items-center">
               <div className="space-y-4 w-3/4">
                  <div className="w-1/4 bg-indigo-100 h-5 rounded-md "></div>
                  <div className="w-2/3 bg-indigo-100 h-4 rounded-md "></div>
                  <div className="w-28 bg-indigo-100 h-8 rounded-md "></div>
               </div>
               <div className="bg-indigo-100 rounded-full h-6 w-6"></div>
            </div>
         </div>
      </div>
   );
}

export default FeedbackSkeleton;
