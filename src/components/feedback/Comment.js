

function Comment({comment}) {
 return (
  <div>
   <div className="comment">
       {comment.author.username}
   </div>
   
  </div>
 )
}

export default Comment
