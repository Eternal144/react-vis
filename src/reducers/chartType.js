import { TOGGLE_CHART} from "../ActionTypes";

// const initialState = {
//     chartFlag:true
// }
const chartFlag = (state = true, action)=>{
    switch (action.type){
        case TOGGLE_CHART:
            return !state
        default:
            return state
    }
}

// export const get
export default chartFlag