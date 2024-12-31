import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [data,setData] = useState("");

  useEffect(()=>{
    (async()=>{
      const resp = await axios.get('http://13.126.231.195:3000');
      console.log(resp.data);
      setData(resp.data);

    })();
  },[])

  return (
    <>
      <h1>Data is this {data}</h1>
    </>
  )
}

export default App
