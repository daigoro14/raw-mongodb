import {React, useState, useEffect} from 'react'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState('')
  

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    fetch('http://localhost:8080/messages', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(data => setMessages(data))
  }

  const sendInputValue = async () => {
        fetch('http://localhost:8080/inputValue', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({inputValue})
        })
        fetchData()
  }


  return (
    <>
      <label><h2>Write something in the input field, if it shows up below it means that frontend, backend and the database is now connected.</h2></label>
      <input onChange={(e) => setInputValue(e.target.value)}/>
      <button onClick={sendInputValue}>Send</button>

      {messages && (messages.map((item) => {
        return (
          <p key={item._id}>{item.message}</p>
        )
      }))}
    </>
  );
}

export default App;
