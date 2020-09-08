import firebase from '../config/firebase'


const db = firebase.firestore();

// shape the data coming from google
export function dataFromSnapshot(snapshot) {
    if(!snapshot.exists) return undefined;
        const data = snapshot.data();

        // transform 'date'
        for (const prop in data) {
            if(data.hasOwnProperty(prop)) {
                if(data[prop] instanceof firebase.firestore.Timestamp) {
                    data[prop] = data[prop].toDate()
                }
            }
        }

        return {
            ...data,
            // adding data coming back
            id: snapshot.id
        }
}


export function getEventsFromFirestore(observer) {
    return db.collection('events').onSnapshot(observer);
}