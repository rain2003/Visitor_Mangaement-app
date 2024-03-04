import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

function Visitor() {
  const [name, setName] = useState('');
  const [contactDetails, setContact] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [date,setDate] = useState(new Date());
  const [mode , setMode ] = useState('date')
  const [show,setShow] = useState(false);
  const [text, setText] = useState('Empty')

  const showMode=(currentMode)=>{
    setShow(true);
    setMode(currentMode)
  }

  const navigation = useNavigation();
  const VisitorLogin=()=>{
    navigation.navigate('VisitorSignin')
  }

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/visitor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorName: name,
          contactDetails: contactDetails,
          visitorEmail: visitorEmail,
          employeeEmail: employeeEmail,
          visitDate: visitDate,
          visitTime: visitTime,
        }),
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading} >Welcome Visitor!!!</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(text) => setContact(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            onChangeText={(text) => setVisitorEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Employee Email"
            onChangeText={(text) => setEmployeeEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Visiting Date"
            onChangeText={(text) => setVisitDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Visiting Time"
            onChangeText={(text) => setVisitTime(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegistration}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
        <Text style={styles.orText}>or</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={VisitorLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 0,
    justifyContent: 'center',
  },
  heading: {
    marginTop: 0,
    justifyContent: 'center',
    fontSize : 19
  },
  cardContainer: {
    justifyContent: 'center',
  },
  card: {
    marginTop: 10,
    width: 300,
    padding: 20,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  orContainer: {
    marginTop: 10,
    alignItems : 'center'
  },
  orText: {
    fontSize: 18,
  },
});

export default Visitor;
