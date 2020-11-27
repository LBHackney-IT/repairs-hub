import axios from 'axios'

const { ENDPOINT_API } = process.env

export const getAlerts = async propertyReference => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/properties/${propertyReference}/cautionary-alerts`
  )
  return data
}
