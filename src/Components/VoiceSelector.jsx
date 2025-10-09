// src/components/VoiceSelector.jsx
import React, { useEffect, useState } from "react";
function VoiceSelector() {
  // 🧠 Estados principales
  const [language, setLanguages] = useState([]);         // Lista de idiomas (ej: "es-ES", "en-US")
  const [languageSelected, setLanguageSelected] = useState(""); // Idioma elegido
  const [voices, setVoices] = useState([]);               // Todas las voces agrupadas por idioma
  const [voiceSelected, setVoiceSelected] = useState(""); // Nombre de la voz elegida
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState("Hola, esta es una prueba de voz.");
  
  // 🧠 1️⃣ Obtener lista de voces desde la API de Google
  useEffect(() => {
  const fetchVoices = async () => {
    try {
      // const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;;  //traer la key de una variable de entorno
      const res = await fetch("http://localhost:4000/listVoz");
      const data = await res.json(); //tipo objet
      ////////////////////////////////////////////////////////
      const lenguajes = Object.keys(data);
      let vocesAgrupadas  =lenguajes.map(lang => ({
        [lang]: data[lang].map(v => ({
          ...v,
          languageCodes: v.languageCodes[0], // simplificar el array
        })),
      }));
      setLanguages(lenguajes);
      setVoices(vocesAgrupadas);
      ////
        // for (const langArr in data) {
        //   lenguajesEncontrados.push(langArr)  //guarda el dato del lenguaje, ya viene ordenado desde el server
        //   var itemsdeLenguaje =data[langArr]// almacena las voces de cada idioma en la iteracion
        //   var nuevoarrmodificado ={[langArr]:[]} // pues creare un objeto con array adentro
        //   for (const element of itemsdeLenguaje) {
        //     // console.log(element);
        //     var elementoAmodificar = element
        //     var valorFormateado= element.languageCodes[0]
        //     elementoAmodificar.languageCodes=valorFormateado
        //     // console.log(elementoAmodificar);
        //     nuevoarrmodificado[langArr].push(elementoAmodificar)
        //   } 
        //   // console.log("end del for");
        //   newArrayVoiceOrdenadoEncontrados.push(nuevoarrmodificado)
        // }
        // console.log("newArrVoiceOrd es ",newArrayVoiceOrdenado);
        // setLanguage(lenguajesEncontrados) //meterel array con solo los nombres de los lenguajes "es-ES" ó "en-EN" y asi
        
        // const Convertido =Object.values(newArrayVoiceOrdenadoEncontrados)
        // setVoices(Convertido)// agora voices tiene un array con las voces /osea todas las voces de cada lenguaje
      ///
    } catch (err) {
      console.error("Error al obtener voces:", err);
    }

//////////////////////////////////////////////////////////////////////////////////
  };
  fetchVoices();
  }, [
      //console.log(console.log("esto es lenguajes",language,"esto es voices",voices)
      ]);
  
  // 🧩 2️⃣ Agrupar por idioma (como hace Google)

  const ListaDeLenguasjes = Object.values(language) //ahora es un array con la lista de los idiomas
  //////
  //para mostrar las voces del idioma elegido
  const listaDeVocesElegidas = voices[languageSelected]// lista de los lenguajes seleccionados
  // 🔊 3️⃣ Función para generar audio con la voz elegida
  const handleSpeak = async () => {
    // try {
    //   const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;;  //traer la key de una variable de entorno
    //   const response = await fetch(
    //     `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         input: { text },
    //         voice: { languageCode: language, name: selectedVoice },
    //         audioConfig: { audioEncoding: "MP3" },
    //       }),
    //     }
    //   );
    //   const result = await response.json();
    //   if (result.audioContent) {
    //     const audio = "data:audio/mp3;base64," + result.audioContent;
    //     setAudioUrl(audio);
    //   }
    // } catch (err) {
    //   console.error("Error al generar audio:", err);
    // }
  };
  ////////////  ARREGLAR ESTO, se deberia poder reducir con map
  // var arrayIdiomaELegido =voicesLangGroup[languageSelected]
  // console.log("el idiomaelegido tiene estas voces",arrayIdiomaELegido);
  // let arrayNombres=[]
  // let objetoVoz=""
  // for (const element in arrayIdiomaELegido) { console.log("elemento es",element);
  //   const item =arrayIdiomaELegido[element]
  //   console.log("elemnto tiene", item["name"])
  //   ; console.log("item es ",item);
  //   // setSelectedVoice(item) arrayNombres.push(item)
  //   }
  // arrayNombres = arrayIdiomaELegido?.map(item => item) || []; //pedir explicaciones
  ////////////////
  
  const vocesDelIdioma = React.useMemo(() => {
    const grupo = voices.find(v => v[languageSelected]);
    return grupo ? grupo[languageSelected] : [];
  }, [voices, languageSelected]);
  
  const buttonidiomaOnClick = (paramIdiomaElegido) => {
    var paramElements= voices
    var idiomaelegido =paramIdiomaElegido
    for (const element of paramElements) { //recorre el array con los  y si encuentra uno que coincida con el lenguaje elegido le dara la las voces de ese lenguaje
      if (element[idiomaelegido]) {
        // console.log("el idioma elegido es",element)
        setvoicesLangGroup(element)
        // console.log(element[idiomaelegido]);
      }
    }
    // console.log(param[1]["af-ZA"][0].name);
    setlanguageSelected(idiomaelegido)
    
  }
  const buttonNombreOnClick = (a) => {
    // setSelectedVoice(a)
    console.log(a)
    setVoicesSelected(a)
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-3">🎙️ Selector de voz de Google TTS</h2>
      {/* Idioma */}
      <label className="block mb-2 font-medium">Idioma:</label>
      <select
        value={languageSelected}
        onChange={(e) => buttonidiomaOnClick(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="">Seleccionar idioma</option>
       {
        vocesDelIdioma.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))
        } 
      </select>

      {/* Nombre */}
      <label className="block mb-2 font-medium">Voz:</label>
      <select
        value={voiceSelected}
        onChange={(e) => buttonNombreOnClick(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="">Seleccionar voz</option>
        {
        // arrayNombres.map((v) => (
        //   <option key={v.name} value={v.name}>
        //     {v.name} — {v.ssmlGender}
        //   </option>
        // ))
        }
      </select>

      {/* Texto */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        rows="3"
      />

      {/* Botón reproducir */}
      <button
        onClick={handleSpeak}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ▶ Reproducir voz
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default VoiceSelector;

