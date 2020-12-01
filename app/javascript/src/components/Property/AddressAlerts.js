import React from 'react'

const AddressAlerts = ({cautionaryAlerts}) => {
  
  const isEmpty = obj => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false
      }
    }
    return JSON.stringify(obj) === JSON.stringify({})
  }

  let alertsToShow = adrAlerts => {
    if (!isEmpty(adrAlerts.alerts)) {
      let alertsHtml = adrAlerts.alerts.map(alert => {
        return (
          <li>
            {alert.description} (
            <span className='govuk-!-font-weight-bold'>{alert.alertCode}</span>)
          </li>
        )
      })

      return (
        <ul className='govuk-tag bg-orange'>Address alerts: {alertsHtml}</ul>
      )
    } else {
      return ""
    }
  }

  return (
    <>
      <div className='hackney-property-alerts'>{alertsToShow(cautionaryAlerts)}</div>
    </>
  )
}

export default AddressAlerts
