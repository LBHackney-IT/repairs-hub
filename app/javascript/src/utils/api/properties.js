import axios from 'axios'

const { ENDPOINT_API } = process.env

export const getProperties = async (params) => {
  const { data } = await axios.get(
    `http://repairs-api-lb-preview-885057472.eu-west-2.elb.amazonaws.com/api/v1/properties/?q=${params}`
  )

  return data
}

export const getProperty = async (propertyReference) => {
  const { data } = await axios.get(
    `http://repairs-api-lb-preview-885057472.eu-west-2.elb.amazonaws.com/api/v1/properties/${propertyReference}`
  )

  return data
}
