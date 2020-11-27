import React, { useState, useEffect } from 'react'
import { getProperty } from '../../utils/api/properties'
import { getAlerts } from '../../utils/api/cautionary_alerts'
import PropertyDetails from './PropertyDetails'
import Spinner from '../Spinner/Spinner'

const PropertyView = (props) => {
  const [property, setProperty] = useState({})
  const [addressAlerts, setaddressAlerts] = useState(null)
  const [loading, setLoading] = useState(false)

  const getPropertyView = async (propertyReference) => {
    try {
      const data = await getProperty(propertyReference)
      setProperty(data)
    } catch (e) {
      setProperty(null)
      console.log('An error has occured:', e)
    }

    setLoading(false)
  }

  const getAlertsView = async (propertyReference) => {
    try {
      const data = await getAlerts(propertyReference)

      setaddressAlerts(data)

    } catch (e) {
      setaddressAlerts(null)
      console.log('An error has occured:', e)
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const propertyReference = props.match.params.propertyReference

    getPropertyView(propertyReference)
    getAlertsView(propertyReference)
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {property && property.address && property.hierarchyType && addressAlerts &&
            <PropertyDetails
              propertyReference={property.propertyReference}
              address={property.address}
              cautionaryAlerts={addressAlerts}
              hierarchyType={property.hierarchyType}
            />
          }
        </>
      )}
    </>
  )
}

export default PropertyView
