import React from 'react'


export const Logout = () => {
const getGuestData = e=> {
  e.preventDefault();
  let data = e.target;
  let user = {
    firstName: data.guestFirstName.value.toUpperCase(),
    lastName: data.guestLastName.value.toUpperCase(),
    address: data.guestAddress.value.toUpperCase(),
    id: data.guestId.value.toUpperCase(),
    phone: data.guestPhone.value.toUpperCase(),
  }

  console.log(user);

}

  return (
    <div>
        <h1>Logout</h1>

        <form onSubmit={getGuestData} >
          <input 
            type='text'
            placeholder='First Name'
            name='guestFirstName'
          ></input>
          <input
            type='text'
            placeholder='Last Name'
            name='guestLastName'
          ></input>
          <input 
            type='text' 
            placeholder='Address'
            name='guestAddress'
          ></input>
          <input 
            type='text'
            placeholder='ID'
            name='guestId'
          ></input>
          <input 
            type='text'
            placeholder='Phone'
            name='guestPhone'
          ></input>
          <button type='submit' value="submit">Submit</button>

        </form>

    </div>
  )
}
