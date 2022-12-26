import axios from 'axios';

//obtained API_KEY from firebase project -> settings
const API_KEY = 'AIzaSyCIfoxVboVlMyXbhQIfHpELQGio7jYZZQ4'

//send request to firebase to create user
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
async function createUser(email, password) {
  const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {
      //correctly formatted second argument (object) based on docs
      email: email,
      password: password,
      returnSecureToken: true
    }
  );
}

//use async await to ensure that function will return a promise that will resolve once request is done