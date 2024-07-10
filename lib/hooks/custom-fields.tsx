const getCustomFields = () => {}

const addCustomField = () => {}

const deleteCustomField = () => {}

const updateCustomField = () => {}

/**
 * A hook to provide methods to get, add, remove, and update custom fields.
 * @returns An object containing the custom fields methods.
 *
 */
export function useCustomFields() {
  return {
    getCustomFields,
    addCustomField,
    deleteCustomField,
    updateCustomField,
  }
}
