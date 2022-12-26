import axios from 'axios';

//obtained API_KEY from firebase project -> settings

const API_KEY = 'AIzaSyCIfoxVboVlMyXbhQIfHpELQGio7jYZZQ4'

//create url dynamically
export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url,
    {
      //correctly formatted second argument (object) based on docs
      email: email,
      password: password,
      returnSecureToken: true
    });

  //tell if request sent successfully
  console.log(response.data);
}

//send request to firebase to create user
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export async function createUser(email, password) {
  //mode spelled just like in docs
  await authenticate('signUp', email, password)
}


export async function login(email, password) {
  await authenticate('signInWithPassword', email, password)
}


//use async await to ensure that function will return a promise that will resolve once request is done