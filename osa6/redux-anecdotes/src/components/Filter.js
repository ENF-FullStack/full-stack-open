import { filterOut } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {

  const handleChange = (event) => {
    const value = event.target.value
    props.filterOut(value)
    console.log(value)
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterOut: (value) => {
      dispatch(filterOut(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(Filter)