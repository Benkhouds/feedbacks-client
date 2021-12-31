function RoadmapCardHeader({ title, description, total }) {
   return (
      <div className="mb-4">
         <h3 className="text-lg font-bold">
            {title} ({total || '...'})
         </h3>
         <p className="text-gray-500 text-sm">{description}</p>
      </div>
   );
}

export default RoadmapCardHeader;
