import React, { useState, useEffect } from 'react'


export const Guests = () => {
  const [guest, setGuest] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:5000/rooms')
    .then(res => res.json())
    .then(data => setGuest(data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div>
        <header className = "header">
            <h1>Guests</h1>
            <hr></hr>
        </header>
        <div className='search'>
          <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"></input>
          </form>
          <button type="button" onclick="alert('You pressed the button!')">Search</button>
        </div>
        <br></br>
        <table className='guest'>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </thead>
          <tbody>
            {guest.map((data,i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.id}</td>
                <td>{data.id}</td>
              </tr>
            ))}     
          </tbody>
        </table>
       
      </div>
  )
}
