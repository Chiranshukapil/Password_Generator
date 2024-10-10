import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length,setlength] = useState(8)
  const [numallowed,setnumallowed] = useState(false)
  const [charallowed,setcharallowed] = useState()
  const[password,setpassword] = useState("")

  //useRef hook
  const passRef = useRef(null)

  const passGenerator  = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed) str+="0123456789"
    if(charallowed) str+="~!@#$%^&*_{}[]:?><"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  }, [length, numallowed, charallowed])

  const copyPasswordtoClip = useCallback(()=>{
    passRef.current?.select()          // ? for optionally selecting as it could also be null
    // passRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passGenerator()},[length, numallowed, charallowed, passGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex rounded-lg shadow overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button onClick={copyPasswordtoClip} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 active:bg-blue-700'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numallowed}
            id='numberInput'
            onChange={()=>{
              setnumallowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked = {charallowed}
              id='charInput'
              onChange={()=>{
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
