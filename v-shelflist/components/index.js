import React, {
  useLayoutEffect,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react'
import {useDispatch, useStore} from 'react-redux'

import {ProductContext} from '../../context/Product'
import {addItemToOrderForm} from '../../redux/oms/actions'
import utils from '../../utils'
import Controller from '../controllers'
import * as style from '../styles'

export const ProductImage = props => {
  const product = useContext(ProductContext)

  const images = product.items[0].images[0].imageUrl.split('/')
  const ids = images[5]
  images[5] = `${ids}-500-800`

  return <style.Image {...props} source={{uri: images.join('/')}} />
}

export const ProductName = props => {
  const product = useContext(ProductContext)
  return (
    <style.Text {...props}>
      {utils.formatCapitalize(product.productName)}
    </style.Text>
  )
}

export const Price = props => {
  const product = useContext(ProductContext)

  const [price, setPrice] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, sellersAvailables => {
      if (sellersAvailables.length > 0) {
        setPrice(
          utils.formatMoney(
            sellersAvailables[0].sellers[0].commertialOffer.Price,
          ),
        )
      }
    })
  }, [])

  return <style.Text {...props}>{price}</style.Text>
}

export const ListPrice = props => {
  const product = useContext(ProductContext)

  const [listPrice, setListPrice] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, sellersAvailables => {
      const price = sellersAvailables[0].sellers.filter(
        e => e.commertialOffer.ListPrice,
      )
      if (sellersAvailables.length > 0) {
        setListPrice(utils.formatMoney(price[0].commertialOffer.ListPrice))
      }
    })
  }, [])

  return <style.Text {...props}>{listPrice}</style.Text>
}

export const BestInstallmentsNumberOfInstallments = props => {
  const product = useContext(ProductContext)

  const [bestInstallment, setBestInstallment] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, sellersAvailables => {
      if (sellersAvailables.length > 0) {
        setBestInstallment(
          Controller.getBestInstallment(
            sellersAvailables[0].sellers[0].commertialOffer.Installments,
          ),
        )
      }
    })
  }, [])

  return bestInstallment ? (
    <style.Text {...props}>
      {`${bestInstallment.NumberOfInstallments}x`}
    </style.Text>
  ) : null
}

export const BestInstallmentsValue = props => {
  const product = useContext(ProductContext)

  const [bestInstallment, setBestInstallment] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, sellersAvailables => {
      if (sellersAvailables.length > 0) {
        setBestInstallment(
          Controller.getBestInstallment(
            sellersAvailables[0].sellers[0].commertialOffer.Installments,
          ),
        )
      }
    })
  }, [])

  return bestInstallment ? (
    <style.Text {...props}>
      {utils.formatMoney(bestInstallment.Value)}
    </style.Text>
  ) : null
}

/**
 * Seletor de skus do produto
 * @param children
 */
const SelectorSkus = props => {
  const product = useContext(ProductContext)
  const {children, items} = props

  items(product.items)

  return <style.Container {...props}>{children}</style.Container>
}

/**
 * Adiciona no carrinho
 * @param children
 */
const AddToCart = props => {
  const product = useContext(ProductContext)
  const {children} = props
  const dispatch = useDispatch()
  const store = useStore()
  const verifyProduct = !product.selectedItem
    ? product.items[0].itemId
    : product.selectedItem.itemId
  return (
    <style.Button
      onPress={() => {
        props.setLoading(true)
        dispatch(
          addItemToOrderForm(
            1,
            store.getState().oms.orderForm.orderFormId,
            verifyProduct,
            1,
            1,
            (error, data) => {
              if (!error) {
                props.setLoading(false)
                props.message(
                  data.messages.length === 0
                    ? 'Produto adicionado a sacola'
                    : data.messages[0].text,
                )
                if (props.openProductModal) {
                  if (data.messages.length === 0) {
                    props.openProductModal()
                  } else if (data.messages[0].text.includes('frete')) {
                    props?.openProductModal()
                  }
                }
              } else {
                props.setLoading(false)
                props.message('error')
              }
            },
          ),
        )
      }}
      {...props}>
      {children}
    </style.Button>
  )
}

export {AddToCart, SelectorSkus}
