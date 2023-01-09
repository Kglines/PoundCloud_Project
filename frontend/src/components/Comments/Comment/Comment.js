import React from 'react'
import DeleteComments from '../DeleteComment';
import './Comment.css';

function Comment({ song, comment, user }) {

    let commentYear = comment?.createdAt.slice(0, 4);
    let commentMonth = comment?.createdAt.slice(5, 7);
    let commentDay = comment?.createdAt.slice(8, 10);
    let commentHour = comment?.createdAt.slice(11, 13);
    let commentMinute = comment?.createdAt.slice(14, 16);

    let amPm;

    if(commentHour > 12){
      commentHour = commentHour - 12
      amPm = 'pm'
    } else {
      amPm = 'am'
    }
    
  return (
    <div className='comment-container'>
      <div>
        <p className='comment-user'>
          <strong>{user}</strong> wrote:
        </p>
        <p className='comment-body'>{comment?.body}</p>
      </div>
      <div>
        <p className='comment-time'>{commentMonth}-{commentDay}-{commentYear} {commentHour}:{commentMinute}{amPm}</p>
        <button>Edit</button>
        <DeleteComments song={song} comment={comment} />
      </div>
    </div>
  );
}

export default Comment
