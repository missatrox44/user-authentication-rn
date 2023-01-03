import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';

import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';

//set up stack based navigation in app.js
const Stack = createNativeStackNavigator();


//navigation for unauthenticated users (create accounts or log in)
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

//screen only accessible if authenticated (user logged in)
function AuthenticatedStack() {
  //useContext to get access to logout function
  const authCtx = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        // logout icon
        options={
          {
            headerRight: ({ tintColor }) =>
              <IconButton
                icon='exit'
                color={tintColor}
                size={24}
                onPress={authCtx.logout} />
          }
        } />
    </Stack.Navigator>
  );
}

function Navigation() {
  //use context to conditionally render stack if logged in or not
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

//
function Root() {
  //check if token taken or not
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      //only autologin user if token is found
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      //change to false regardless if login successful or not
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    //when apploading -> splash screen is prolonged
    return <AppLoading />;
  }

  return <Navigation />
}

export default function App() {


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
