import firebase from "../config/firebase";

const db = firebase.firestore();

// shape the data coming from google
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  // transform 'date'
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    // adding data coming back
    id: snapshot.id,
  };
}

// GET ALL EVENTS with PREDICATE Filter
// Predicate on Event Dashboard
export function listenToEventsFromFirestore(predicate) {
  const user = firebase.auth().currentUser;

  let eventsRef = db.collection("events").orderBy("date");
  // run Firebase query
  switch (predicate.get("filter")) {
    case "isGoing":
      return eventsRef
        .where("attendeesIds", "array-contains", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    case "isHost":
      return eventsRef
        .where("hostUid", "==", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    default:
      return eventsRef.where("date", ">=", predicate.get("startDate"));
  }
}

// GET User EVENTS with Query filter
// Predicate on EventsTab
export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection("events");
  const today = new Date();
  switch (activeTab) {
    case 1: // past events
      return eventsRef
        .where("attendeesIds", "array-contains", userUid)
        .where("date", "<=", today)
        .orderBy("date", "desc"); // most recent events first;
    case 2: /// hosting
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
    default:
      return eventsRef
        .where("attendeesIds", "array-contains", userUid)
        .where("date", ">=", today)
        .orderBy("date");
  }
}

// GET SINGLE EVENT
export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

// POST EVENT
export function addEventToFirestore(event) {
  // currently logged in user
  const user = firebase.auth().currentUser;
  console.log(event);
  return db.collection("events").add({
    ...event,
    hostUid: user.uid, // used to check what events the user is hosting
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    // array.push in firebase
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    // string based arrays
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

// UPDATE EVENT
export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

// DELETE event
export function deleteEventInFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

// Cancel event
export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

// POST New USER to firebase on Register
export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

// GET USER PROFILE
export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

// UPDATE USER Profile
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    // updates the Login userName
    if (user.displayName !== profile.displayName) {
      console.log(user.displayName);
      console.log(profile.displayName);
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    // updates OUR database with teh rest of the user info (description)
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

// UPDATE User Profile PHOTO
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    // if the user has no current photo
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

// GET user Photos from Firebase
export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

// UPDATE set Main Photo
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    // update photo user
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    // update profile (auth)
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error.message;
  }
}

// UPDATE DELETE PHOTO
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

// POST Add User ATTENDANCE
export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      // string based arrays
      attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

// POST Cancel user Attendance
export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection("events").doc(event.id).get();
    console.log(eventDoc);
    return db
      .collection("events")
      .doc(event.id)
      .update({
        // first array of simple strings
        attendeesIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        // second array of Objects
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}
