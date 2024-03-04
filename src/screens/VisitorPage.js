import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

const visitorPageStyles = StyleSheet.create({
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
  listItem: {
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
  cellVisitorName: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize : 17
  },
  cell: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 8,
    fontSize : 16
  },
});

function VisitorPage({ route }) {
  const { visitorEmail } = route.params;
  const [visitorRequests, setVisitorRequests] = useState([]);

  const fetchVisitorRequests = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/visitor/requests/${visitorEmail}`);
      setVisitorRequests(response.data);
    } catch (error) {
      console.error('Error fetching visitor requests:', error);
    }
  };

  useEffect(() => {
    // Fetch data initially when the component mounts
    fetchVisitorRequests();

    // Set up an interval to fetch data every, for example, 10 seconds
    const intervalId = setInterval(() => {
      fetchVisitorRequests();
    }, 10000); // 10 seconds in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({ item }) => (
    <View style={visitorPageStyles.listItem}>
      <Text style={visitorPageStyles.cellVisitorName}>{`Visitor Name: ${item.visitorName}`}</Text>
      <Text style={visitorPageStyles.cell}>{`Contact Details: ${item.contactDetails}`}</Text>
      <Text style={visitorPageStyles.cell}>{`Employee Email: ${item.employeeEmail}`}</Text>
      <Text style={[visitorPageStyles.cellVisitorName, item.visitStatus === 'ACCEPTED' ? { color: '#66ff66' } : null, item.visitStatus === 'Pending' ? { color: '#0099ff' } : null, item.visitStatus === 'REJECTED' ? { color: 'red' } : null]}>{`Visit Status: ${item.visitStatus}`}</Text>
      <Text style={visitorPageStyles.cell}>{`Visit Time: ${item.visitTime}`}</Text>
      <Text style={visitorPageStyles.cell}>{`Visit Date: ${item.visitDate}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={visitorPageStyles.container}>
      <Text style={visitorPageStyles.heading}>Welcome {visitorEmail}</Text>
      <FlatList
        data={visitorRequests}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default VisitorPage;
