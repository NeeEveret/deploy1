import React, { useState } from 'react'

export default function Component() {
  const [text, setText]= useState() // useState te da una 2 valores el primero para guadar datos y el segundo para actualuzarlo
  const [updated, setUpdated] = useState()


  const textOnChange = (event) => {
    setText(event.target.value)
  }

  const buttonOnClick = () => {
    setUpdated(text)
  }


  return (
    <div>
      <div>componente al que le gusta dinero</div>
      <input type='text' value={text} onChange={textOnChange}/>
      <button onClick={buttonOnClick}>Actualizar</button>
      <p>Texto input: {text}</p>
      <p>Texto actualizado: {updated}</p>
    </div>
  )
}