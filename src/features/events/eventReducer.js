// import { sampleData } from '../../app/api/sampleData';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, CLEAR_COMMENTS, CLEAR_EVENTS } from './eventConstants';
import { LISTEN_TO_EVENT_CHAT } from './eventConstants';
import { LISTEN_TO_SELECTED_EVENT } from './eventConstants';

const initialState = {
    // events: sampleData
    events: [],
    moreEvents: true,
    comments: [],
    selectedEvent: null
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
                events: [...state.events, ...payload.events],
                moreEvents: payload.moreEvents
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
        case LISTEN_TO_SELECTED_EVENT:
            return {
                ...state,
                selectedEvent: payload
            }
        case CLEAR_EVENTS:
            return {
                ...state,
                events: [],
                moreEvents: true
            }
        default :
            return state
    }
}