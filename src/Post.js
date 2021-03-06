import React, {Fragment, useEffect, useState} from 'react'
import './Post.css'
// import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';
import {Button} from '@material-ui/core';
import firebase from 'firebase'

function Post({postId,username,caption,imageUrl,user}) {
    const [comments, setComments] = useState([])
    const [comment,setComment]=useState('')

    
    useEffect(()=>{
        let unsubscribe
        if(postId){
            unsubscribe=db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            // .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })
        }

        return()=>{
            unsubscribe()
        }

    },[postId])


    const postComment=(event)=>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user.displayName,
            // timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');

    }

    return (
        <Fragment>
        <div className="post">
            <div className="post_header">
                <Avatar 
                className='post_avatar'
                alt="Semy Sharp" 
                src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
        </div>


            <img className="post_image" src={imageUrl} alt="image" />
            {/*  */}
            <h4 className='post_text'> <strong>{username} :</strong> {caption}</h4>

            {/* Add comment under Post */}


            <div className="post_comments">
                { comments.map((comment) =>(
                    <p>
                        <strong>{comment.username}</strong> :{comment.text}
                    </p>

                )) }
            </div>

            {user &&(

                <form className="post_commentBox">
                <input className="post_input"
                placeholder="add comment ..."
                value={comment}
                onChange={(e) =>setComment(e.target.value)}
                type="text" />

                <Button
                disabled={!comment} 
                className="post_button"
                type="submit"
                onClick={postComment}
                >Post</Button>
                </form>
            )}



        </div>
        </Fragment>
    )
}

export default Post
