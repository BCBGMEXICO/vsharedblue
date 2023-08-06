import { bindActionCreators } from 'redux'

import * as adminActions from '../redux/admin/actions'
import catalogActions from '../redux/catalog/actions'
import * as omsActions from '../redux/oms/actions'
import * as loginActions from '../redux/login/actions'
import * as checkoutActions from '../redux/oms/checkout/actions'

const mapStateToProps = (state) => ({
  state: {
    admin: state.admin,
    catalog: state.catalog,
    oms: { ...state.oms, checkout: state.checkout },
    login: state.login,
  },
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    admin: bindActionCreators({ ...adminActions }, dispatch),
    catalog: bindActionCreators({ ...catalogActions }, dispatch),
    oms: { ...bindActionCreators({ ...omsActions }, dispatch), checkout: bindActionCreators({ ...checkoutActions }, dispatch) },
    login: bindActionCreators({ ...loginActions }, dispatch),
  },
})

export { mapStateToProps, mapDispatchToProps }
