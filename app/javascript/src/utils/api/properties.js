import axios from 'axios'
import authHeader from './auth-header'

const { ENDPOINT_API } = process.env

export const getProperties = async (params) => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/properties/?q=${params}`,
    { headers: authHeader() }
  )

  return data
}

export const getProperty = async (propertyReference) => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/properties/${propertyReference}`,
    { headers: authHeader() }
  )

  return data
}
