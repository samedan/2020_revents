import firebase from '../config/firebase'
import cuid from 'cuid';


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

// GET ALL EVENTS
export function listenToEventsFromFirestore() {
    return db.collection('events').orderBy('date');
}

// GET SINGLE EVENT
export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

// POST EVENT
export function addEventToFirestore(event) {
    console.log(event);
    return db.collection('events').add({
        ...event,
        hostedBy: 'Diana',
        hostPhotoURL: 'https://www.randomlists.com/img/animals/salamander.jpg',
        // array.push in firebase
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Diana',
            photoURL: 'https://www.randomlists.com/img/animals/salamander.jpg',
        })
    })
}

// UPDATE EVENT
export function updateEventInFirestore(event) {
    return db.collection('events').doc(event.id).update(event);
}


// DELETE event
export function deleteEventInFirestore(eventId) {
    return db.collection('events').doc(eventId).delete();
}

// Cancel event
export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}

// POST New USER to firebase on Register
export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

// GET USER PROFILE
export function getUserProfile(userId) {
    return db.collection('users').doc(userId)
}