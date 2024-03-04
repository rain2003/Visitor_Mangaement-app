  import React, { useState, useEffect } from "react";
  import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
  import axios from 'axios';

  function Security() {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
      const fetchAllVisits = async () => {
        try {
          const response = await axios.get('http://10.0.2.2:5000/security/visits');
          setVisits(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // Fetch data initially when the component mounts
      fetchAllVisits();

      // Set up an interval to fetch data every, for example, 10 seconds
      const intervalId = setInterval(() => {
        fetchAllVisits();
      }, 10000); // 10 seconds in milliseconds

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

    const renderItem = ({ item }) => (
      <View style={styles.row}>
        <Text style={styles.cellvisitorName}>{`Visitor Name: ${item.visitorName}`}</Text>
        <Text style={styles.cell}>{`Contact Details: ${item.contactDetails}`}</Text>
        <Text style={styles.cell}>{`Employee Email: ${item.employeeEmail}`}</Text>
        <Text style={[styles.cell, item.visitStatus === 'ACCEPTED' ? { color: '#66ff66' } : null, item.visitStatus === 'Pending' ? {color : '#0099ff'}:null , item.visitStatus === 'REJECTED' ? { color: 'red' } : null]}>{`Visit Status: ${item.visitStatus}`}</Text>
        <Text style={styles.cell}>{`Visit Time: ${item.visitTime}`}</Text>
        <Text style={styles.cell}>{`Visit Date: ${item.visitDate}`}</Text>
        {/* Add other cells as needed */}
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Welcome Security Personnel</Text>
        <FlatList
          data={visits}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcccc',
      padding: 15,
      paddingTop: 40,
    },
    heading: {
      padding: 20,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },
    row: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
    },
    cellvisitorName: {
      textAlign: 'center',
      color: '#555',
      marginBottom: 8,
      fontWeight : 'bold'
    },
    cell: {
      textAlign: 'center',
      color: '#555',
      marginBottom: 8,
    },
  });

  export default Security;
