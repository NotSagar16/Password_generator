import { useState, useCallback, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setlength] = useState(8)
  const [num, setnum] = useState(false)
  const [symbol, setsymbol] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const copyPass=useCallback(
    () => {
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )
  
  const notify = () => {toast.success('Copied!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });}
  

  const passGen = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str+="0123456789"
    if(symbol) str+="~!@#$&[]{}+-/*"
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)

  },[length,num,symbol,setpassword])
  useEffect(() => {
    passGen()
  }, [length,num,symbol,passGen])
  
  return (
    <div className='main'>
      <div className="content">
          <h1 className='heading'>Password Generator</h1>
          <div className='box'>
            <div className='text'>
              <input type="text"
              value={password}
              placeholder='password'
              id='password'
              readOnly
              ref={passwordRef}
              />
              <button onClick={() => { notify();copyPass();  }}>Copy</button>

              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
            </div>
            <input type="range" 
            min={6}
            max={100} 
            value={length}
            id="range"
            onChange={(e)=>{setlength(e.target.value)}}/>
            <label htmlFor="">Length:{length}</label>

            <div className="checkbox">
              <input type="checkbox" name="" id="numberInput" 
              defaultChecked={num}
              onChange={()=>{setnum((prev)=>!prev)}}/>
              <label htmlFor="numberInput">Numbers</label>
            </div>
            
            <div className="checkbox">
              <input type="checkbox" name="" id="symbolInput" 
              defaultChecked={symbol}
              onChange={()=>{setsymbol((prev)=>!prev)}}/>
              <label htmlFor="symbolInput">Symbols</label>
            </div>
            
            
          </div>
          
      </div>
    </div>
  )
}

export default App
