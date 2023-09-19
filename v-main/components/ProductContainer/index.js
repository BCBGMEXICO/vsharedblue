import React from 'react'

import { ProductContext } from '../../../context/Product'

const ProductContainer = ({ children, product }) => (
  <ProductContext.Provider value={product}>{children}</ProductContext.Provider>
)

export default ProductContainer
