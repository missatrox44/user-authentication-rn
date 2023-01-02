import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

//welcome screen only available to view after user has logged in
function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  //import context to access token value
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  //accessing 'protected resources'
  //demo 'protected message' data 
  //add ?auth= as query param for firebase API calls
  useEffect(() => {
    axios.get('https://user-authentication-rn-default-rtdb.firebaseio.com/message.json?auth=' + token)
      .then((response) => {
        setFetchedMessage(response.data)
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
