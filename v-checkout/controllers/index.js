/**
 * Cria o contexto do controller da SavedItem
 * @param {*} state state do redux
 * @param {*} actions actions do redux
 */
const savedItem = (state, actions) => ({
  /**
   * Salva ou remove item de uma lista de compras
   * @param {*} isSavedItem estado do item (salvo na lista ou não)
   * @param {*} shoppingListId id da lista de compras
   * @param {*} product objeto do produto
   * @param {*} store id da loja
   * @param {*} cb callback
   */
  saveOrRemoveItem: (isSavedItem, shoppingListId, skuId, name, store, cb) => {
    if (isSavedItem) {
      actions.admin.removeItemShoppingList(
        shoppingListId,
        skuId,
        store,
        (err) => (err ? null : cb(false)),
      )
    } else {
      actions.admin.insertItemShoppingList(
        shoppingListId,
        skuId,
        name,
        store,
        (err) => (err ? null : cb(true)),
      )
    }
  },
  /**
   * Seleciona o id do produto de acordo com o objeto
   * @param {*} typeObjectProduct tipo do objeto do produto (v-shelflist, v-cart)
   * @param {*} product objeto do produto
   */
  selectIdForTypeObjectProduct: (typeObjectProduct, product) => {
    switch (typeObjectProduct) {
      case 'v-shelflist':
        return product.items[0].itemId
      case 'v-cart':
        return product.id
      default:
        return 0
    }
  },
  /**
   * Seleciona o id do produto de acordo com o objeto
   * @param {*} typeObjectProduct tipo do objeto do produto (v-shelflist, v-cart)
   * @param {*} product objeto do produto
   */
  selectNameForTypeObjectProduct: (typeObjectProduct, product) => {
    switch (typeObjectProduct) {
      case 'v-shelflist':
        return product.productName
      case 'v-cart':
        return product.name
      default:
        return 0
    }
  },
})

export default {
  savedItem,
}
