import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState("")
  const [cep, setCep] = useState(null);

  function verificarCep() {
    if (!cep.includes("-")) {
      alert("ideve incluir '-' apos o 5 numero!")
    } else if (!cep || cep.length < 9 || cep.length > 10) {
      alert("insira um cep valido porra😡🤬")
    }
  }

  async function shareCep() {
    verificarCep();
    try {
      const respostinha = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );
      const dadinho = await respostinha.json();
      setDados(dadinho);
      setLoading(true)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="center">

        <header><h1>Mostrar CEP</h1></header>

        <div className='princ'>
          <h1>Buscar CEP</h1>
          <input type="text"
            value={cep}
            onChange={(bosteio) => setCep(bosteio.target.value)}
            placeholder='Digite seu CEP'
          />
          <button onClick={shareCep}>Buscar Cep</button>

          {loading && <p>Carregando...</p>}

          {dados && !loading && (
            <div>
              <p>Cep: {dados.cep}</p>
              <p>Logradouro: {dados.logradouro}</p>
              <p>Bairro: {dados.bairro}</p>
              <p>Localidade: {dados.localidade}</p>
              <p>UF: {dados.uf}</p>

            </div>
          )}
        </div>


      </section>
    </>
  )
}

export default App
