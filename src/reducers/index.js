import { combineReducers } from 'redux'
import events from './event'
import chartFlag from './chartType'

export default combineReducers({
    events,
    chartFlag
})