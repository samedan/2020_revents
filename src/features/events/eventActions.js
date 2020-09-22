import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, LISTEN_TO_SELECTED_EVENT, CLEAR_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './../../app/async/asyncReducer';
 import { dataFromSnapshot, fetchEventsFromFirestore } from './../../app/firestore/firestoreService';


export function createEvent(event) {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

export function updateEvent(event) {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export function deleteEvent(eventId) {
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
}

export function fetchEvents(predicate, limit, lastDocSnapshot) {
    return async function(dispatch) {
        dispatch(asyncActionStart())
        try {
            const snapshot = await fetchEventsFromFirestore(predicate, limit, lastDocSnapshot).get();
            // get the last retrievded event
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            // ctry to find if tehre ar emore vents
            const moreEvents = snapshot.docs.length >= limit;
            const events = snapshot.docs.map(doc => dataFromSnapshot(doc))
            dispatch({type: FETCH_EVENTS, payload: {events, moreEvents}});
            dispatch(asyncActionFinish());
            return lastVisible;
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}

export function listenToSelectedEvent(event) {
    return {
        type: LISTEN_TO_SELECTED_EVENT,
        payload: event
    }
}


export function listenToEventChat(comment) {
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comment
    }
}

export function clearEvents() {
    return {
        type: CLEAR_EVENTS,
        
    }
}