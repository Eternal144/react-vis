import event from '../api/events'
import { RECEIVE_EVENT, TOGGLE_CHART} from "../ActionTypes";

const receiveEvents = events => {
    return {
        type: RECEIVE_EVENT,
        events
    }
}


export const getAllEvents = () => dispatch => {
    event.getEvents(event=>{
        dispatch(receiveEvents(event))
    })
}

// 切换渲染的图形
export const toggleChart = () => (dispatch, getState) =>{
    // console.log("aaa")
    // console.log(getState())
    dispatch({
        type: TOGGLE_CHART,
        // chartFlag: !getState().chartFlag
    })
}