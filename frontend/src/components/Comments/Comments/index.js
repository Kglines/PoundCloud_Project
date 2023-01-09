import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetComments } from '../../../store/comments'
import Comment from '../Comment/Comment'
import './Comments.css'


function Comments({ song }) {
    const dispatch = useDispatch()
    const [comments, setComments] = useState(null)
    const [errors, setErrors] = useState([])

    const commentsArr = useSelector(state => state.comments)
    
    useEffect(() => {
      const fetchData = async () => {
        const comments = await dispatch(fetchGetComments(song?.id));
        setComments(comments);
        };
        fetchData().catch(async (res) => {
          const data = res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }, [dispatch, song?.id, comments?.Comments?.length])

  return (
    <div className='comments-container'>
      <p className='comments-total'>{comments?.Comments?.length} comments</p>
      {commentsArr?.Comments?.map((comment) => (
        <div key={comment?.id}>
          <Comment comment={comment} song={song} user={comment?.User?.username} />
        </div>
      ))}
    </div>
  );
}

export default Comments
