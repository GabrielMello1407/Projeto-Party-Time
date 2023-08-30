import React from 'react'
import partyFetch from '../axios/config'
import { useState, useEffect } from 'react'
import './Form.css'

import { useNavigate } from 'react-router-dom'

import useToast from '../hook/useToast'


const CreateParty = () => {
  const [services, setServices] = useState([])

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState(0)
  const [image, setImage] = useState("")
  const [partyServices, setPartServices] = useState([])

  const navigate = useNavigate()

  // loadservices
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services")

      setServices(res.data)
    }
    loadServices()
  }, [])
  // add or remove services
  const handleServices = async (e) => {
    const checked = e.target.checked
    const value = e.target.value
    const filteredService = services.filter((s) => s._id === value)

    if (checked) {
      setPartServices((services) => [...services, filteredService[0]])
    } else {
      setPartServices((services) => services.filter((s) => s._id !== value))
    }

  }

  // Create a new party
  const createParty = async (e) => {
    e.preventDefault()

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      }

      const res = await partyFetch.post("/parties", party)

      if (res.status === 201) {
        navigate("/")

        useToast(res.data.msg)
      }
    } catch (error) {
      useToast(error.response.data.msg, "error")
    }
  }

  return (
    <div className='form-page'>
      <h2>Crie sua próxima Festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input type="text" placeholder='Digite o nome da sua festa' required onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Organizador da festa:</span>
          <input type='text' placeholder='Nome do autor da festa' required onChange={(e) => setAuthor(e.target.value)} value={author} />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea placeholder='Descrição da festa' required onChange={(e) => setDescription(e.target.value)} value={description} />
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Valor da festa' required onChange={(e) => setBudget(e.target.value)} value={budget} />
        </label>
        <label>
          <span>Imagem:</span>
          <input type="text" placeholder='Insira a url de uma imagem' required onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 && services.map((service) => (
              <div className="service" key={service._id}>
                <img src={service.image} alt={service.name} />
                <p className='service-name'>{service.name}</p>
                <p className="service-price">R${service.price}</p>
                <div className="checkbox-container">
                  <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)} />
                  <p>Marque para solicitar!</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="submit" value="Criar Festa" className='btn' />
      </form>
    </div>
  )
}

export default CreateParty