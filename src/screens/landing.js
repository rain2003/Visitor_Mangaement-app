import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Landing( { navigation}) {
  
  function EmployeeButton(){
    navigation.navigate( 'EmployeeSignin');
  }
  
  function SecuirtyButton(){
    navigation.navigate('SecuritySignin');
  }

  function VisitorButton(){
    navigation.navigate('Visitor')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.employeeButton]}
        activeOpacity={0.7} // Adjust the opacity to control the touch feedback
        onPress={EmployeeButton}
      >
        <Text style={styles.buttonText}  >Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.securityButton]}
        activeOpacity={0.7}
        onPress={SecuirtyButton}
      >
        <Text style={styles.buttonText}>Security</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>or</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.visitorButton]}
        activeOpacity={0.7}
        onPress={VisitorButton}
      >
        <Text style={styles.buttonText}>Are you a visitor?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccff66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    padding: 20, // Increase the height of the button
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  employeeButton: {
    backgroundColor: '#e0ffe0', // Very light shade of green
    marginBottom: 20
  },
  securityButton: {
    backgroundColor: '#e0ffe0',
    marginBottom: 10

  },
  visitorButton: {
    backgroundColor: '#e0ffe0',
    marginTop: 30

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    marginTop: 10,
  },
  orText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
