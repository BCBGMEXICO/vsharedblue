import { useStore, useDispatch } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from './mapsToProps'

const useWithRedux = () => {
  const store = useStore()
  const dispatch = useDispatch()

  return ({
    state: mapStateToProps(store.getState()).state,
    actions: mapDispatchToProps(dispatch).actions,
  })
}

export default useWithRedux
