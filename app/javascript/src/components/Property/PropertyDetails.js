import React from 'react'
import AddressAlerts from './AddressAlerts'

const PropertyDetails = ({ propertyReference, address, hierarchyType, cautionaryAlerts }) => (

  <div>
    <h1 className="govuk-heading-l">
      {hierarchyType.subTypeDescription}: {address.addressLine}
    </h1>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <div className="govuk-body-s">
          <span className="govuk-body-xs">
            Property details
          </span>
          <br></br>
          <span className="govuk-!-font-weight-bold text-green">
            {address.addressLine}
          </span>
          <br></br>
          {address.streetSuffix &&
           <>
            <span className="govuk-!-font-weight-bold text-green">
              {address.streetSuffix}
            </span>
            <br></br>
           </>
          }
          <span className="govuk-body-xs text-green">
            {address.postalCode}
          </span>
          <br></br>
          <AddressAlerts cautionaryAlerts={cautionaryAlerts}/>
        </div>
      </div>
    </div>
  </div>
)

export default PropertyDetails
