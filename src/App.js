import './App.css';
import Post from'./Post'
import React,{useEffect, useState} from 'react'
import db from './firebase'

function App() {
  const [posts, setposts] = useState([])

  // useEfect
  // This is Important in the sense that it has been feching data from database with id of element
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
      setposts(snapshot.docs.map(doc=>({
        post:doc.data(),
        id:doc.id
      
      })))
    })
    
  }, [])
  return (
    <div className="App">
      
        <div className="app_header">
          <div className="app_headerImage">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            height='50em' 
            width='150em'
            alt="Insta Logo"   />
          </div>
        </div>

      {
        posts.map(({id,post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      
    </div>
  );
}

export default App;
