import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';

import LoadingOverlay from '../components/ui/LoadingOverlay'

function SignupScreen() {
  //manage loading state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //email/password props already validated in AuthContent.js
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    await createUser(email, password);
    setIsAuthenticating(false);
  }

  //return overlay while request is on the way
  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
