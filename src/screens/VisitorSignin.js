import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function VisitorSignin() {
    const navigation = useNavigation();

    const handleLogin = async (visitorEmail) => {
        try {
          const response = await fetch(`http://10.0.2.2:5000/visitor/login/${visitorEmail}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          navigation.navigate('VisitorPage',{visitorEmail});
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };


    const [email, setEmail] = useState('');
    return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.loginButton} onPress={()=>handleLogin(email)}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#e0ffe0',
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});