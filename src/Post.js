import React, {Fragment} from 'react'
import './Post.css'
// import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

function Post({username,caption,imageUrl}) {
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
        </div>
        </Fragment>
    )
}

export default Post
