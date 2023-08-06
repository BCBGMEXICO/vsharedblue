import React, {
  useContext, useState, useLayoutEffect,
} from 'react'

import useWithRedux from '../../utils/useWithRedux'
import { ProductContext } from '../../context/Product'
import ProductContainer from './ProductContainer'
import Controller from '../controllers'
import * as style from '../styles'


/**
 * Componente de salvar e excluir item de uma lista de compras
 * @param {*} typeObjectProduct tipo do objeto do produto (v-shelflist, v-cart)
 * @param {*} shoppingListId id da lista de compras
 * @param {*} store id do item
 * @param {*} savedItem funcão que retorna se o item estava salva ou não
 */
const SavedItem = (props) => {
  const {
    typeObjectProduct, savedItem, shoppingListId, store,
  } = props

  const product = useContext(ProductContext)
  const [isSavedItem, setSavedItem] = useState(false)
  const { state, actions } = useWithRedux()
  const {
    saveOrRemoveItem,
    selectIdForTypeObjectProduct,
    selectNameForTypeObjectProduct,
  } = Controller.savedItem(state, actions)

  useLayoutEffect(() => {
    const hasSavedItem = state.admin.shoppingList[0].items.filter((item) => (
      item.productId === product.productId
    )).length > 0

    setSavedItem(hasSavedItem)
    savedItem(hasSavedItem)
  }, [])

  return (
    <style.Button
      {...props}
      onPress={() => {
        saveOrRemoveItem(
          isSavedItem,
          shoppingListId,
          selectIdForTypeObjectProduct(typeObjectProduct, product),
          selectNameForTypeObjectProduct(typeObjectProduct, product),
          store,
          (is) => {
            setSavedItem(is)
            savedItem(is)
          },
        )
      }}
    />
  )
}


export { ProductContainer, SavedItem }
