import React from 'react'
import './Post.css'
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                className='post_avatar'
                alt="Semy Sharp" 
                
                src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
        </div>


            <img className="post_image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="" srcset="" />
            {/*  */}
            <h4 className='post_text'> <strong>Username</strong> :caption</h4>
        </div>
    )
}

export default Post
