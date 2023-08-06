import React, {
  useLayoutEffect,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { useDispatch, useStore } from 'react-redux'

import { ProductContext } from '../../context/Product'

import {
  removeItemOrderForm,
  getPostalCode,
  getDeliverys,
  selectDeliveryOption,
  addItemToOrderForm,
  removeCupomOrderForm,
} from '../../redux/oms/actions'
import utils from '../../utils'
import useWithRedux from '../../utils/useWithRedux'
import Controller from '../controllers'
import * as style from '../styles'

export const ProductImage = (props) => {
  const { vtexWidth = 100, vtexHeight = 150 } = props

  const product = useContext(ProductContext)
  const uriImage = { uri: product.imageUrl }

  const imageNotHttp = product.imageUrl.substring(7)
  const imageSplited = imageNotHttp.split('/')

  let imageUrl = 'http:/'

  imageSplited.map((item, idx) => {
    if (idx === 3) {
      const imageIdSplited = item.split('-')[0]
      imageUrl = `${imageUrl}/${imageIdSplited}-${vtexWidth}-${vtexHeight}`
    } else {
      imageUrl = `${imageUrl}/${item}`
    }
  })

  return <style.Image {...props} source={{ uri: imageUrl }} />
}

export const ProductName = (props) => {
  const product = useContext(ProductContext)

  return <style.Text {...props}>{product.name}</style.Text>
}

export const Price = (props) => {
  const product = useContext(ProductContext)
  return (
    <style.Text {...props}>
      R$
      {' '}
      {utils.formatMoney(product.price / 100)}
    </style.Text>
  )
}

export const ListPrice = (props) => {
  const product = useContext(ProductContext)

  const [listPrice, setListPrice] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, (sellersAvailables) => {
      if (sellersAvailables.length > 0) {
        setListPrice(
          utils.formatMoney(
            sellersAvailables[0].sellers[0].commertialOffer.ListPrice,
          ),
        )
      }
    })
  }, [])

  return <style.Text {...props}>{listPrice}</style.Text>
}

export const BestInstallmentsNumberOfInstallments = (props) => {
  const product = useContext(ProductContext)

  const [bestInstallment, setBestInstallment] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, (sellersAvailables) => {
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

export const BestInstallmentsValue = (props) => {
  const product = useContext(ProductContext)

  const [bestInstallment, setBestInstallment] = useState(0)

  useLayoutEffect(() => {
    Controller.availableProducts(product, (sellersAvailables) => {
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
const SelectorSkus = (props) => {
  const product = useContext(ProductContext)
  const { children, items } = props

  items(product.items)

  return <style.Container {...props}>{children}</style.Container>
}

/**
 * remove -1 do carrinho
 * @param children
 * @param setIsloading seta o loading na tela
 */
const RemoveFromCart = (props) => {
  const product = useContext(ProductContext)
  const { children } = props
  const dispatch = useDispatch()
  const store = useStore()

  return (
    <style.Button
      onPress={() => {
        props.setLoading(true)
        props.getPostalCode !== undefined ? props.getPostalCode() : null
        if (store.getState().oms.orderForm?.totalizers?.length > 1) {
          dispatch(
            removeItemOrderForm(
              1,
              store.getState().oms.orderForm.orderFormId,
              product.idx,
              0,
              () => {
                dispatch(
                  removeCupomOrderForm(
                    1,
                    store.getState().oms.orderForm.orderFormId,
                    () => {
                      props.setLoading(false)
                    },
                  ),
                )
              },
            ),
          )
        } else {
          dispatch(
            removeItemOrderForm(
              1,
              store.getState().oms.orderForm.orderFormId,
              product.idx,
              0,
              () => {
                props.setLoading(false)
              },
            ),
          )
        }
      }}
      {...props}
    >
      {children}
    </style.Button>
  )
}

/**
 * adiciona + 1 no carrinho
 * @param children
 * @param setIsloading seta o loading na tela
 */
const PlusProduct = (props) => {
  const product = useContext(ProductContext)
  const { children } = props
  const dispatch = useDispatch()
  const store = useStore()
  return (
    <style.Button
      onPress={() => {
        props.setLoading(true)
        dispatch(
          addItemToOrderForm(
            1,
            store.getState().oms.orderForm.orderFormId,
            product.id,
            product.quantity + 1,
            product.seller,
            (err, data) => {
              props.setLoading(false)
              if (props.cb) props.cb(err, data)
            },
          ),
        )
      }}
      {...props}
    >
      {children}
    </style.Button>
  )
}

/**
 * remover do carrinho
 * @param children
 * @param setIsloading seta o loading na tela
 */
const MinusProduct = (props) => {
  const product = useContext(ProductContext)
  const { children } = props
  const dispatch = useDispatch()
  const store = useStore()

  return (
    <style.Button
      onPress={() => {
        props.setLoading(true)
        dispatch(
          removeItemOrderForm(
            1,
            store.getState().oms.orderForm.orderFormId,
            product.idx,
            product.quantity - 1,
            (err, data) => {
              props.setLoading(false)
              if (props.cb) props.cb(err, data)
            },
          ),
        )
      }}
      {...props}
    >
      {children}
    </style.Button>
  )
}

/**
 * Adiciona um vouncher
 * @param children Componente a ser renderizado
 * @param voucher Voucher a ser adicionado
 * @param setLoading seta o loading
 */
const AddVoucher = (props) => {
  const {
    children, store, voucher, cb,
  } = props

  const { state, actions } = useWithRedux()
  return (
    <style.Button
      {...props}
      onPress={() => {
        props.setLoading !== undefined ? props.setLoading(true) : null,
        actions.oms.setCoupon(
          store,
          state.oms.orderForm.orderFormId,
          voucher,
          (err, messages) => cb(err, messages),
        )
      }}
    >
      {children}
    </style.Button>
  )
}

/** MULTIPLAS formas de entregas
 * @param {*} setLoading seta o loading passando true ou false
 * @param {*} setShowDeliveryOptions mostra as opcoes de entrega 'delivery'
 * @param {*} Text texto do campo de cep
 * @param children
 */
const CalculateShipping = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const store = useStore()

  return (
    <style.Button
      {...props}
      onPress={() => {
        props.setLoading(true)
        dispatch(
          getPostalCode(props.text, 1, (err, data) => {
            console.log(data)
            if (!err) {
              dispatch(
                getDeliverys(
                  store.getState().oms.orderForm.orderFormId,
                  1,
                  data,
                  (err) => {
                    if (!err) return props.setShowDeliveryOptions(true)
                  },
                ),
              )

              console.log('tuksj', data)

              props.setLoading(false)
              if (props.cb) props.cb(false, data)
            } else {
              props.setLoading(false)
              if (props.cb) props.cb(true, null)
              console.log('err')
            }
          }),
        )
      }}
    >
      {children}
    </style.Button>
  )
}

/** seleciona MULTIPLAS formas de entregas
 * @param children
 * @param {*} deliveryOption opcoes de entregas
 * @param {*} setLoading loading
 * @param {*} type tipo de entrega
 */
const SelectDelivery = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const store = useStore()

  return (
    <style.Button
      onPress={() => {
        props.setLoading(true)
        dispatch(
          selectDeliveryOption(
            store.getState().oms.orderForm.orderFormId,
            1,
            props.deliveryOption,
            (error, data) => {
              if (!error) {
                props.setLoading(false)
                props.handleOnClick()
              } else {
                props.setLoading(false)
              }
            },
          ),
        )
      }}
    >
      {children}
    </style.Button>
  )
}

/**
 * totalizador
 * @param children
 */
export const Totalizer = (props) => {
  const store = useStore()
  const verify = store.getState().oms.totalizerFinalFrete !== undefined
    ? store.getState().oms.orderForm.totalizers[0].value
        + store.getState().oms.totalizerFinalFrete
    : store.getState().oms.orderForm.totalizers[0].value

  return (
    <style.Text {...props}>
      R$
      {' '}
      {store.getState().oms.orderForm.totalizers.length > 0
        ? utils.formatMoney(verify / 100)
        : '0,00'}
    </style.Text>
  )
}

/**
 * sub total
 * @param children
 */
export const SubTotal = (props) => {
  const store = useStore()

  return (
    store.getState().oms.orderForm.totalizers.map((item) => item.id === 'Items' && (
      <style.Text {...props}>
            R$
        {' '}
        {store.getState().oms.orderForm.totalizers.length > 0
          ? utils.formatMoney(item.value / 100)
          : '0,00'}
      </style.Text>
    ))
  )
}

/**
 * totalizador2
 * @param children
 */
export const NewTotalizer = (props) => {
  const store = useStore()

  return (
    <style.Text {...props}>
            R$
      {' '}
      {store.getState().oms.orderForm.value > 0
        ? utils.formatMoney(store.getState().oms.orderForm.value / 100)
        : '0,00'}
    </style.Text>
  )
}

/**
 * Apenas o preço dos items
 * @param children
 */
export const ItemPrice = (props) => {
  const store = useStore()

  return (
    <style.Text {...props}>
      R$
      {' '}
      {store.getState().oms.orderForm.totalizers.length > 0
        ? store.getState().oms.orderForm.totalizers.length > 1
          ? utils.formatMoney(
            store.getState().oms.orderForm.totalizers[0].value / 100
                + store.getState().oms.orderForm.totalizers[1].value / 100,
          )
          : utils.formatMoney(
            store.getState().oms.orderForm.totalizers[0].value / 100,
          )
        : '0,00'}
    </style.Text>
  )
}

export {
  RemoveFromCart,
  SelectorSkus,
  AddVoucher,
  CalculateShipping,
  SelectDelivery,
  MinusProduct,
  PlusProduct,
}
