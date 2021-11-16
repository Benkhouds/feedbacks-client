function CommentWithReplies({comment}) {
 return (
  <div>
  
   {comment.content}
   {comment.comments.map((reply)=>(<p>{reply.content}</p>))}
   
  </div>
 )
}

export default CommentWithReplies
