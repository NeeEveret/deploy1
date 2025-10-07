// src/components/VoiceSelector.jsx
import React, { useEffect, useState } from "react";
function VoiceSelector() {
  const [voices, setVoices] = useState([]);
  const [language, setLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [text, setText] = useState("Hola, esta es una prueba de voz.");
  const [audioUrl, setAudioUrl] = useState("");

  // 🧠 1️⃣ Obtener lista de voces desde la API de Google
  useEffect(() => {
  const fetchVoices = async () => {
//////////////////////////////////////////////////////////////////////////////////
    try {
      console.log("intento");
      
      // const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;;  //traer la key de una variable de entorno
      const res = await fetch("http://localhost:4000/listVoz");
      const data = await res.json(); //tipo objet
      let lenguajes=[]
      for (const langArr in data) {
        lenguajes.push(langArr)
        // console.log(langArr);
      }
      // setVoices(data);
      setVoices(lenguajes);

      // if (data.response) {
      //   console.log("DATA OK");
        
      // }
      
    } catch (err) {
      console.error("Error al obtener voces:", err);
    }
//////////////////////////////////////////////////////////////////////////////////
  };
  fetchVoices();
  }, []);

  // 🧩 2️⃣ Agrupar por idioma (como hace Google)
  const languages = voices
  // const languages = [...new Set(voices.map(v => v.languageCodes[0]))];
  // const filteredVoices = voices
  //   .filter(v => !language || v.languageCodes.includes(language))
  //   .sort((a, b) => a.name.localeCompare(b.name));

  // 🔊 3️⃣ Función para generar audio con la voz elegida
  const handleSpeak = async () => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;;  //traer la key de una variable de entorno
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode: language, name: selectedVoice },
            audioConfig: { audioEncoding: "MP3" },
          }),
        }
      );
      const result = await response.json();
      if (result.audioContent) {
        const audio = "data:audio/mp3;base64," + result.audioContent;
        setAudioUrl(audio);
      }
    } catch (err) {
      console.error("Error al generar audio:", err);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-3">🎙️ Selector de voz de Google TTS</h2>

      {/* Idioma */}
      <label className="block mb-2 font-medium">Idioma:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="">Seleccionar idioma</option>
        {
          languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))
        }
      </select>

      {/* Voz */}
      <label className="block mb-2 font-medium">Voz:</label>
      <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="">Seleccionar voz</option>
        {/* {filteredVoices.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name} — {v.ssmlGender}
          </option>
        ))} */}
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
