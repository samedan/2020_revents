import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from'../../app/config/firebase'


// SIGN iN
export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user
  }
}

// VERIFY Auth
export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if(user) {
        dispatch(signInUser(user))
      } else {
        dispatch(signOutUser())
      }
    })
  }
}

// SIGN OUT
export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
