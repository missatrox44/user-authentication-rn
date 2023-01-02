import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

//pass isLogin prop
function LoginScreen() {
  //manage loading state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext)

  //email/password props already validated in AuthContent.js
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!')
    }
    setIsAuthenticating(false);
  }

  //return overlay while request is on the way
  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;


//can send back more specific error message based on type of error -> refer to docs