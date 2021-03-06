import React from 'react'
import { render } from '@testing-library/react'
import PropertiesTable from './PropertiesTable'

describe('PropertiesTable component', () => {
  const props = {
    properties: [
      {
        "propertyReference": "00012345",
        "address": {
          "shortAddress": "16 Pitcairn House  St Thomass Square",
          "postalCode": "E9 6PT",
          "addressLine": "16 Pitcairn House",
          "streetSuffix": "St Thomass Square"
        },
        "hierarchyType": {
          "levelCode": "7",
          "subTypeCode": "DWE",
          "subTypeDescription": "Dwelling"
        }
      },
      {
        "propertyReference": "00012346",
        "address": {
          "shortAddress": "1 Pitcairn House  St Thomass Square",
          "postalCode": "E9 6PT",
          "addressLine": "1 Pitcairn House",
          "streetSuffix": "St Thomass Square"
        },
        "hierarchyType": {
          "levelCode": "7",
          "subTypeCode": "DWE",
          "subTypeDescription": "Dwelling"
        }
      }
    ],
  }

  it('should render properly', () => {
    const { asFragment } = render(<PropertiesTable {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
