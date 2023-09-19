import { bindActionCreators } from 'redux'

const createActionsMiddleware = (dispatch, actions) => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default createActionsMiddleware
