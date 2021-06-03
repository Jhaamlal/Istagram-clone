import './App.css';
import Post from'./Post'
import React,{useEffect, useState} from 'react'
import {db,auth} from './firebase'
import {Button, Input, makeStyles, Modal} from '@material-ui/core';


function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles()
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [posts, setposts] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user,setUser]=useState(null)

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

//  This down code wil keep you log in even after refresh and rether then save localStorage specially onAuthStateChanged
  useEffect(()=>{
      const unsubscribe =auth.onAuthStateChanged((authUser)=>{
        if(authUser){
            setUser(authUser)

            if(authUser.displayName){
              // If user is already present then make sure nothing happen
            }else{
              return authUser.updateProfile({
                displayName:username
                // If user is not present then make new Id
              })
            }
        }else{
            setUser(null)
        }
      })
      return ()=>{
        unsubscribe()
      }
  },[user,username])

  const signUp=(event)=>{
    event.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.displayName({
          displayName:username
        })
      })
      .catch((err) =>alert(err.message))
  }

  return (
    <div className="App">

      {/* Modal */}
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
       
      >
        {/* Modal Body */}

        <div style={modalStyle} className={classes.paper}>

        <form className="app_signup">
          <center>
            <img className="app_headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
            height='50em' 
            width='150em'
            alt="" 
            />
            <br />
          <div className='input_all'>
            <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
            />

            <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            />

            <Input 
                placeholder='Password'
                type='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
          {user ?(
            <Button onClick={()=>auth.signOut()}>Logout</Button>
          ):
            <Button onClick={signUp} type="submit">Sign UP</Button>
        }
            </div>
          </center>
        </form>
        </div>
        {/* Modal Body */}
      </Modal>

      {/* Modal */}
      
        <div className="app_header">
          <div className="app_headerImage">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            height='50em' 
            width='150em'
            alt="Insta Logo" />
          </div>
        </div>

      <Button onClick={()=>setOpen(true)}>Sign Up</Button>

      {
        posts.map(({id,post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      
    </div>
  );
}

export default App;
