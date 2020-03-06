
import { RECEIVE_EVENT } from "../ActionTypes";


const events = (state = [],action)=>{
    switch (action.type){
        case RECEIVE_EVENT:
            // console.log(action)
            return [
                ...state,
                ...action.events
            ]
        default:
            return state
    }
}
// 默认为第一种

export default events