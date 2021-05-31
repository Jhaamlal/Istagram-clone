import './App.css';
import Post from'./Post'

function App() {
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

      <Post />
     
    </div>
  );
}

export default App;
