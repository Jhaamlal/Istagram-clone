import './App.css';
import Post from'./Post'
import React,{useEffect, useState} from 'react'
import {db,auth} from './firebase'
import {Button, Input, makeStyles, Modal} from '@material-ui/core';
import ImageUplode from './ImageUplode';
import InstagramEmbed from 'react-instagram-embed';


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
  const [openSignIn, setopenSignIn] = useState(false)
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
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
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
      setOpen(false)
  }

  const signIn=(event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .catch(err=>alert(err.message))
    setopenSignIn(false)
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

      {/* Modle 2 */}
      

      <Modal
        open={openSignIn}
        onClose={()=>setopenSignIn(false)}
       
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
            <Button onClick={signIn} type="submit">Sign in </Button>
        
        }
            </div>
          </center>
        </form>
        </div>
        {/* Modal Body */}
      </Modal>


      {/* Modle 2 */}
      
        <div className="app_header">
          <div className="app_headerImage">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            height='50em' 
            width='150em'
            alt="Insta Logo" />
          </div>


            {user ?(
              <Button onClick={()=>auth.signOut()}>Logout</Button>
            ):
            <div className="app_loginContainer">
              <Button onClick={()=>setopenSignIn(true)} >Sign in </Button>
              <Button onClick={()=>setOpen(true)}>Sign UP</Button>
              {/* onClick =>setOpen(true) */}

            </div>
          }
          
        </div>

      <div className="app_posts">

        <div className="app_postsLeft">

            {
              posts.map(({id,post})=>(
                
                <Post key={id.toString()} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              ))
            }
        </div>
        
        <div className="app_postsRight">
        <InstagramEmbed
            url='https://www.instagram.com/virat.kohli/'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}

            />

        </div>


      </div>
      

  




        {/*   This has created propblemto me that, User?-----use to take that is that when it is there ((optinal))  */}
    { user?.displayName ? (
      <ImageUplode username={user.displayName}/>
    ):(<h3>Sorry Darling ,Sorry Darling ,go for login Darling</h3>)
    }

      
    </div>
  );
}

export default App;
