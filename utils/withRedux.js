import React from 'react'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from './mapsToProps'

const withRedux = (Component) => {
  const WrapperComponent = (props) => <Component {...props} />

  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent)
}

export default withRedux
