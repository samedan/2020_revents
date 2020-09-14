// import { sampleData } from '../../app/api/sampleData';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, CLEAR_COMMENTS } from './eventConstants';
import { LISTEN_TO_EVENT_CHAT } from './eventConstants';

const initialState = {
    // events: sampleData
    events: [],
    comments: []
}

export default function eventReducer(state = initialState, {type, payload}) {
    switch(type){
        case CREATE_EVENT: 
            return {
                ...state,
                events: [...state.events, payload]
            };
        case UPDATE_EVENT:
            return {
                ...state,
                // 'filter' returns an [] of all the events NOT updated + the updated one
                events: [...state.events.filter(evt => evt.id !== payload.id), payload]
            };
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(evt => evt.id !== payload)]
            };
        case FETCH_EVENTS:
            return {
                ...state,
                events: payload
            }
        case LISTEN_TO_EVENT_CHAT:
            return {
                ...state,
                comments: payload
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: []
            }
        default :
            return state
    }
}