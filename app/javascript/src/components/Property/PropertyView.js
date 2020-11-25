import React, { useState, useEffect } from 'react'
import { getProperty } from '../../utils/api/properties'
import PropertyDetails from './PropertyDetails'
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../Errors/ErrorMessage/ErrorMessage'

const PropertyView = (props) => {
  const [property, setProperty] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const getPropertyView = async (propertyReference) => {
    setError(null)

    try {
      const data = await getProperty(propertyReference)
      setProperty(data)
    } catch (e) {
      setProperty(null)
      console.log('An error has occured:', e.response)
      setError(`Oops an error occurred with error status: ${e.response?.status}`)
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const propertyReference = props.match.params.propertyReference

    getPropertyView(propertyReference)
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {property && property.address && property.hierarchyType &&
            <PropertyDetails
              propertyReference={property.propertyReference}
              address={property.address}
              hierarchyType={property.hierarchyType}
            />
          }
          {error && <ErrorMessage label={error} />}
        </>
      )}
    </>
  )
}

export default PropertyView
