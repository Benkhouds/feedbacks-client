

export default function CommentHeader({firstName, lastName, username , onClick}) {
 return (
  <header className="flex justify-between items-center w-full mb-3">
  <div className="flex items-center">
      <img
        className="rounded-full relative w-10"
        src="https://via.placeholder.com/40"
        alt="profile-img"
      />  
      <div className="ml-4 ">
        <h3 className="font-semibold text-gray-800 capitalize whitespace-nowrap">
          {firstName} {lastName}
        </h3>
        <p className="text-sm text-indigo-400">
          @{username}
        </p>
      </div>
    </div> 
      <button
        className="text-blue-600 hover:underline text-xs font-semibold"
        onClick={onClick}
      >
        Reply
      </button>

  </header>
 )
}
