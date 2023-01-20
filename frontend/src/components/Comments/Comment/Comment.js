import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import DeleteComments from '../DeleteComment';
import EditComment from '../EditComment';
import './Comment.css';

function Comment({ song, comment, user }) {

    const [showModal, setShowModal] = useState('')

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
        <div className='comment-btns'>
          <button className='edit-btn' onClick={() => setShowModal(true)}>Edit</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditComment comment={comment} setShowModal={setShowModal} />
            </Modal>
          )}
          <DeleteComments song={song} comment={comment} />
        </div>
      </div>
    </div>
  );
}

export default Comment
