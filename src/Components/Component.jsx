import React, { useState } from 'react'
import './Component.css'
export default function Component() {
  const [text, setText]= useState("") // useState te da una 2 valores el primero para guadar datos y el segundo para actualuzarlo
  const [updated, setUpdated] = useState("")
  
  const textOnChange = (event) => {
    setText(event.target.value)
  }

  const buttonOnClick = () => {
    setUpdated(text)
  }
  
  const consumirApi = async (paramTexto) => {
    if(paramTexto.trim()===""){ //si el texto esta vacio o es solo espacios no se ejecutara el codigo
      alert("Por favor ingresa un texto.");
      return;
    }
    const textoParaUsar =paramTexto //aqui mando el texto del input para que lo grabe
    const dataJason = {
      input: { text: textoParaUsar },
      voice: {
        languageCode: "es-ES",  // idioma
        ssmlGender: "FEMALE"    // voz femenina
      },  
      audioConfig: {
        audioEncoding: "MP3",
        pitch: 2.0,
        speakingRate: 1.0
      }
    };

    //enviar el dato a la api
    try {
      // const respuesta = await fetch("https://node-api-para-recordar.onrender.com/teto", {
      const respuesta = await fetch("https://node-api-para-recordar.onrender.com/teto", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataJason) // 👈 aquí va el JSON
      });
  
      const data = await respuesta.json(); 
  
      if (data) {
        // Crear un <audio> en el navegador
        let audiofinal64 = data.audios.join("")// convertir array a string en base64
        const audio = new Audio("data:audio/mp3;base64," + audiofinal64); //convertirlo a audio
        audio.play();
        
      } else {
        console.error("Error:", data);
      }
  
  
    } catch (error) {
      console.error("Error al llamar la API:", error);
    }
  } 
  
  const buttonOnClickStartRecrd = () => {
    consumirApi(text)
  // const textoParaUsar = "Este es el texto de ejemplo,todook. O tal vez No.";
  

};


  return (
    <div className='divContainer'>
      <div >Pega el texto aquí</div>
      <div>TOCA ESPERARR si o si</div>
      <div>Empiezo a entender</div>
      <input className='InputTexto'type='text' value={text} onChange={textOnChange}/>
      <div className='divButtomContainer'>
        <button className='divButtomInt' onClick={buttonOnClick}>Actualizar</button>
        <button className='divButtomInt' onClick={buttonOnClickStartRecrd}>Enviar a Grabar</button>
      </div>
      <p>Texto input: {text}</p>
      <p>Texto actualizado: {updated}</p>
    </div>
  )
}