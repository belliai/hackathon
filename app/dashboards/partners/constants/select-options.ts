import { addressStatusLabelMap } from "./address-status-map"
import { companyTypeLabelMap } from "./company-types-map"

export const companyTypeOptions = Object.entries(companyTypeLabelMap).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    }
  }
)

export const addressStatusOptions = Object.entries(addressStatusLabelMap).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    }
  }
)

export const DUMMY_SELECT_OPTIONS = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
]
