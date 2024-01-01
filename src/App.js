import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'top-loading-bar/dist'

function App() {
  document.body.style.backgroundColor = "#5372EF"
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)
  const[author,setAuthor]=useState('')
  let copyBtn = () => {
    navigator.clipboard.writeText(text)
    toast.success("Copied Successfully")
  }
  const getQuote = async() =>{
    setProgress(30)
    const data = await fetch("https://type.fit/api/quotes")
    setProgress(70)
    const parsedData = await data.json()
    setProgress(90)
    
    
  let random = Math.floor((Math.random()*parsedData.length)+1)
  setText(parsedData[random].text)
  setAuthor(parsedData[random].author)
  console.log(parsedData);
  setProgress(100)
}
useEffect(()=>{
  getQuote()

},[])
let newBtn=()=>{getQuote()}

  return (
    <>
    <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container-md p-md-3 mx-sm-auto mx-2  pb-2 bg-light text-dark border border-5 shadow shadow-lg rounded-4 w-100" style={{ maxWidth: "600px", marginTop: "200px" }}>
        <h1 className="text-center fs-2 mb-3 fw-bold">
          Quote of the Day
        </h1>
        <div className="fs-4 text-center mx-3">
          {text}
        </div>
        <p className="float-end fs-5 d-block me-2 text-muted">
          <i className="bi bi-dash-lg"></i>{author}
        </p>
        <br />
        <hr className='mt-4' />
        <div className="d-flex justify-content-between ">
          <button className='btn text-light rounded-circle' onClick={copyBtn} style={{ backgroundColor: '#5372EF' }}><i className="bi bi-clipboard fs-3"></i></button>
          <button className='btn text-light px-3 rounded-pill fs-5' style={{ backgroundColor: '#5372EF' }} onClick={newBtn}>New Quote</button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />

    </>
  );
}

export default App;
