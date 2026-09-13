import { BrowserRouter, Routes, Route } from "react-router";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';

const App=()=>{
  let pageSize=20
  let api_key= process.env.REACT_APP_API_KEY

    const[progress,setProgress]=useState(0)
  
    return (
        <BrowserRouter>
      <div>
      <Navbar/>

      <LoadingBar
        color="#f11946"
        progress={progress}
       
      />

    <Routes>
      <Route path="/" element={<News setProgress={setProgress} api_key={api_key}  key='general' pageSize={pageSize} category='general'/>} />
      <Route path="/business" element={<News setProgress={setProgress} api_key={api_key} key='business' pageSize={pageSize} category='business'/>} />
      <Route path="/entertainment" element={<News setProgress={setProgress} api_key={api_key} key='entertainment' pageSize={pageSize} category='entertainment'/>} />
      <Route path="/general" element={<News setProgress={setProgress} api_key={api_key} key='general' pageSize={pageSize} category='general'/>} />
      <Route path="/health" element={<News setProgress={setProgress} api_key={api_key} key='health' pageSize={pageSize} category='health'/>} />
      <Route path="/science" element={<News setProgress={setProgress} api_key={api_key} key='science' pageSize={pageSize} category='science'/>} />
      <Route path="/sports" element={<News setProgress={setProgress} api_key={api_key} key='sports' pageSize={pageSize} category='sports'/>} />
      <Route path="/technology" element={<News setProgress={setProgress} api_key={api_key} key='technology' pageSize={pageSize} category='technology'/>} />
    </Routes>

        
      </div>
  </BrowserRouter>
    )
  }

export default App

