import {CAP} from "../../constants/actionTypes"
// import axios from "axios";

const STATE=[];    

export const marketReducer = (state = STATE ,action)=>{
    switch (action.type){
        case CAP:
            {
                return state=action.payload;
            }
        default:
            {
                return state;
            }
    }
}