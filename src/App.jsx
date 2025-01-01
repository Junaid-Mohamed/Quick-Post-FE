import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data,setData] = useState("");

  useEffect(()=>{
    (async()=>{
      const resp = await axios.get('https://quick-post-be-1.vercel.app/');
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
