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

  // const buttonOnClickStartRec = (event) => {
  // //para enviar dattos debo usar POST, con este metodo usado aqui no se puede
  // // Texto a enviar (si en el futuro tu API lo recibe por POST)
  //   const texto = "text pero string";
  //   console.log("El texto a enviar es:", texto);

  //   // Ejemplo de parámetros
  //   const numeroA = 5;
  //   const numeroB = 10;

  //   // Construimos la URL dinámicamente
  //   const url = `https://node-api-para-recordar.onrender.com/random/${numeroA}/${numeroB}`;

  //   // Función asíncrona para llamar a la API
  //   const enviar = async () => {
  //     console.log("si");
      
  //     try {
  //       const respuesta = await fetch(url);
  //       // Si tu API devuelve JSON:
  //       // const data = await respuesta.json();
  //       const data = await respuesta.text();
        
  //       console.log("La respuesta de la API:", data);
  //     } catch (err) {
  //       console.error("Error llamando a la API:", err);
  //     }
  //   };

  //   enviar();
  // }
  // const buttonOnClickStartRecrdss  = () =>{
  //   //Solo datos para pasarlo a la api de google sp
  //   //const API_KEY="va a estar en el server"
  //   const textoParaUsar ="Hola, esto es una prueba usando API Key con la API de Google Text to Speech."
  //   const dataJason ={
  //     "input": {"text": textoParaUsar},
  //     "voice": {
  //       "languageCode": "es-ES",   // idioma (puedes usar es-US, es-MX, etc.)
  //       "ssmlGender": "FEMALE"     // voz femenina
  //     },
  //     "audioConfig": {
  //       "audioEncoding": "MP3",    // tipo de salida: MP3, LINEAR16 (wav), OGG_OPUS
  //       "pitch": 2.0,
  //       "speakingRate": 1.0
  //     }
  //   }
  //   const url = `https://node-api-para-recordar.onrender.com/teto/${dataJason}`;

  //   async function consumirApi() {
  //     try {
  //       const respuesta = await fetch(url);
  //       const data = await respuesta.json(); // si la API devuelve JSON
  //       console.log("respondio cón", data);
  //     } catch (error) {
  //       console.error("Error al llamar la API:", error);
  //     }
  //   }
  //   consumirApi();
  // }
  const buttonOnClickStartRecrd = () => {
  //texto de ejemplo 
  // este texto sera sin modificar, deeremos traer el texto de el input html y envierlo a la api para que lo "transforme"
  const textoParaUsar = "Este es el texto de ejemplo,TODOK. O tal vez No";
                      //"Hola, esto es una prueba usando API Key con la API de Google Text to Speech.Estoy probando la librería natural. ¿Funciona bien para dividir en oraciones? Sí, parece que sí.";
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

  async function consumirApi() {
    //enviar el dato a la api
    try {
      // const respuesta = await fetch("https://node-api-para-recordar.onrender.com/teto", {
      const respuesta = await fetch("http://localhost:4000/teto", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataJason) // 👈 aquí va el JSON
      });

      const data = await respuesta.json(); 
      await console.log("Respuesta de la API:", data);
      //ahora la data tendra el objeto con con el audio en base 64 en en "data.audioContent"
      // if (data.audioContent) {
      //   // Crear un <audio> en el navegador
      //   const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
      //   audio.play();
      let audiofinal64 =""
      if (data) {
        // Crear un <audio> en el navegador
        console.log(data);
        for (const audio64 of data.audios) {
          audiofinal64=audiofinal64+audio64
        }
      } else {
        console.error("Error:", data);
      }
      const audio = new Audio("data:audio/mp3;base64," + audiofinal64);
      audio.play();


    } catch (error) {
      console.error("Error al llamar la API:", error);
    }
  } 

  consumirApi();
};


  return (
    <div className='divContainer'>
      <div >Pega el texto aquí</div>
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