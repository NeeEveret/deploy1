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
  
  const testUrlApi = async(urls) => {
    //Pues para no estar cambiando manualmente de url, pondre la local y online
    //comprueba si la url responde
    const dataDePrueba = {
      prueba: true,
      mensaje: "Solo estoy probando",
      estado: "ok"
    };

    let urlsOK=[];

    for (const url of urls) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000); // 5 segundos máx.

      try {
        const respuesta = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataDePrueba),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if(!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

        const resTest = await respuesta.json()

        if(resTest.prueba){ //debe devolver un json con una prop prueba de valor "true"
          console.log(`✅ Servidor activo en: ${url}`, resTest);
          urlsOK.push(url)
        }else {
        console.warn(`⚠️ Respuesta inesperada desde ${url}:`, resTest);
      }
      }catch (err) {
        console.warn(`❌ No se pudo conectar a ${url}:`, err.message);
      }
    }
    return urlsOK;
  }
  
  const consumirApi = async (paramTexto) => {
    if(paramTexto.trim()===""){ //si el texto esta vacio o es solo espacios no se ejecutara el codigo
      alert("Por favor ingresa un texto.");
      return;
    }
    const textoParaUsar =paramTexto //aqui mando el texto del input para que lo grabe
   
    //GET https://texttospeech.googleapis.com/v1/voices?key=
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
    //hay que revisar  a cual y que configuraciones estas usando para eñ json
    //Las voces nuevas no aceptap el parametro "pitch", las estandar si
    
    const urls = ["http://localhost:4000/teto", "https://node-api-para-recordar.onrender.com/teto"];
    // const respuesta = await fetch("https://node-api-para-recordar.onrender.com/teto", {
    //
    (async () => {
      const urlsDisponibles = await testUrlApi(urls);

      if (urlsDisponibles.length > 0) {
          // Aquí podrías llamar a tu función que hace el POST real
          // consumirApi(urlsDisponibles[0], textoParaUsar)
          for (const urlA of urlsDisponibles) {
            // const controller = new AbortController();
            // const timeout = setTimeout(() => controller.abort(), 5000); // 5s máx

            try {
              const respuesta = await fetch(urlA, {  
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dataJason) // 👈 aquí va el JSON
              });

              const data = await respuesta.json(); 
              
              if (data && data.audios) {
                let audiofinal64 = data.audios.join("");
        
              const audio = new Audio("data:audio/mp3;base64," + audiofinal64);
              audio.play().catch(err => console.error("Error al reproducir:", err));
              }else {
              console.error("No se recibió audio en la respuesta.");
              }
              if (data) {
                // Crear un <audio> en el navegador
                let audiofinal64 = data.audios.join("")// convertir array a string en base64
                const audio = new Audio("data:audio/mp3;base64," + audiofinal64); //convertirlo a audio
                audio.play();
                return console.log(`la url usada fue ${urlA}`);
                
              } else {
                console.error("Error:", data);
              }

            } catch (error) {
              console.error("Error al llamar la API:", error);
            }
          }
          /////////////////////////////////////////////////
        } else {
          console.error("🚨 Ninguna API está disponible.");
        }
    })();
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
      <input className='InputTexto'id ={"elidunico1"}type='text' value={text} onChange={textOnChange}/>
      <div className='divButtomContainer'>
        <button className='divButtomInt' onClick={buttonOnClick}>Actualizar</button>
        <button className='divButtomInt' onClick={buttonOnClickStartRecrd}>Enviar a Grabar</button>
      </div>
      <p>Texto input: {text}</p>
      <p>Texto actualizado: {updated}</p>
    </div>
  )
}