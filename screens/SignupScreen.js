import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { Alert } from 'react-native';
import { createUser } from '../util/auth';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  //manage loading state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  //email/password props already validated in AuthContent.js
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      //call auth function after successful login/sign up to get token from firebase
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed!', 'Could not create user. Please check your input and/or try again later!');
      setIsAuthenticating(false);
    }
  }

  //return overlay while request is on the way
  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

