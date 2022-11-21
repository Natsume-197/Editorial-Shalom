// Clase que permite la conexión con una o varias APIs
import axios from 'axios'

export const BASE_API_URLS = [
  // Conexión con la API de la Editorial Shalom de acuerdo al entorno
  { name: 'ShalomAPI', endpoint: import.meta.env.VITE_API_URL_SHALOM },
]

const api = axios.create({
  baseURL: BASE_API_URLS[0].endpoint, 
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
