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

    //GET https://texttospeech.googleapis.com/v1/voices?key=AIzaSyBuZNE5vGyuQHGHSadWYc4Xbt989cdHNRQ
/////////////////////////////////////////
    const dataJason = {
      input: { text: textoParaUsar },
      voice: {
        languageCode: "es-ES",  // idioma
        ssmlGender: "FEMALE",    // voz femenina
        name:"es-ES-Chirp-HD-O",
      },  
      audioConfig: {
        audioEncoding: "MP3",
        // pitch: 2.0,
        speakingRate: 1.0
      }
    };
    /////////////////////////////////////////
    
    ////////////////////////////////////////
    //enviar el dato a la api
    try {
      //local
      //const respuesta =await fetch("http://localhost:4000/teto")
      // const respuesta = await fetch("https://node-api-para-recordar.onrender.com/teto", {
      //
      const respuesta = await fetch("http://localhost:4000/teto", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataJason) // 👈 aquí va el JSON
      });
  
      const data = await respuesta.json(); 
      
      console.log("Respuesta completa de la API:", data);
      if (data && data.audios) {

      
        
        let audiofinal64 = data.audios.join("");
        console.log("Base64 recibido (longitud):", audiofinal64.length);
        console.log("Base64 inicio:", audiofinal64.substring(0, 100));
        console.log("Base64 fin:", audiofinal64.substring(audiofinal64.length - 100));

        console.log("Base64 recibido (primeros 100 chars):", audiofinal64.substring(0, 100));

      const audio = new Audio("data:audio/mp3;base64," + audiofinal64);
      audio.play().catch(err => console.error("Error al reproducir:", err));
    } else {
      console.error("No se recibió audio en la respuesta.");
    }
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
      <div>
        Escribe o pega el texto que quieras convertir a audio<br/>
        Esta app usa las voces de goolgle
        <p></p>
      </div>
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