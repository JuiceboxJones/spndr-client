

const HistoryHelper = {

historyGoTo(loc, prop){
  const { location, history } = prop
  const prev = prop.match.path
  const destination = (location.state || {}).from || loc
  history.push({ pathname: destination, state: { prev } })
},

historyGoBack(prop){
  const hProp = prop
  hProp.history.goBack()
}

}
export default HistoryHelper;