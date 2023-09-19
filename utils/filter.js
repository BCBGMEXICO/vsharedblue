export const selectedItems = (value, tag, state) => {
  const target = state?.selectedItems[tag]?.find(e => e === value)
  if (!target) {
    if (!state.selectedItems[tag]) {
      state.selectedItems[tag] = []
    }
    return {
      ...state.selectedItems,
      [tag]: [...state.selectedItems[tag], value],
    }
  } else {
    if (
      tag === 'Brands' ||
      tag === 'PriceRanges' ||
      tag === 'CategoriesTrees'
    ) {
      if (state.selectedItems[tag] !== value) {
        return {...state.selectedItems, [tag]: [value]}
      }
    } else {
      const index = state.selectedItems[tag].findIndex(i => i === value)
      if (index >= 0) {
        return {
          ...state.selectedItems,
          [tag]: [
            ...state.selectedItems[tag].slice(0, index),
            value,
            ...state.selectedItems[tag].slice(index + 1),
          ],
        }
      } else {
        return {
          ...state.selectedItems,
          [tag]: [...state.selectedItems[tag], value],
        }
      }
    }
  }
}
