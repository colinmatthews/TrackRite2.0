
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  SET_PIE_DATA(state,obj){
    state.pieData = obj
  },
  SET_COLUMN_DATA(state,obj){
    state.columnData = obj
  },
  SET_BAR_DATA(state,obj){
    state.barData = obj
  }
}