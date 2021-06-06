import {Button} from '@material-ui/core'
import React, {useState} from 'react'
import {db,storage} from './firebase'
import firebase from 'firebase'
import './ImageUplode.css'


function ImageUplode({username}) {
    const [caption, setcaption] = useState('')
    const [image, setImage] = useState('')
    const [progress, setprogress] = useState(0)

    const handleChange=(e)=>{
        e.preventDefault()
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
        

        
    }

    const handleUplode=(event)=>{
        const uplodeTask=storage.ref(`image/${image.name}`).put(image);
        uplodeTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setprogress(progress)
            },
            (error)=>{
                console.log(error);
                alert(error.message)
            },
            ()=>{
                // Complete
                storage
                .ref("image")     
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url, 
                        username:username
                    })
                    setprogress(0)
                    setcaption('')
                    setImage(null)
                })
            }
        )

    }
    return (
        <div className="imageuplode">
           
        <progress value={progress} max="100" className="imageuplode_progress"/>
        <input type="text" placeholder="Enter a Caption ....." value={caption} onChange={event =>setcaption(event.target.value)}/>
        <input type="file" placeholder="Uplode Image" onChange={handleChange}/>
        <Button className="imageuplode_button" onClick={handleUplode}>Uplode</Button>

            
        </div>
    )
}

export default ImageUplode
