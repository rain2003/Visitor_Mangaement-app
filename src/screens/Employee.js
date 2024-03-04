import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
// Assuming you have already set up your fetch function
const fetchEmployeeRequests = async (employeeEmail) => {
  try {
    const response = await fetch(`http://10.0.2.2:5000/employee/requests/${employeeEmail}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee requests:', error);
    throw error;
  }
};

export default function Employee({ route }) {
  const { email } = route.params;
  const [employeeRequests, setEmployeeRequests] = useState([]);

  useEffect(() => {
    const getEmployeeRequests = async () => {
      try {
        const data = await fetchEmployeeRequests(email);
        setEmployeeRequests(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    getEmployeeRequests();
  }, [email]);

  const handleStatusUpdate = async (visitId, status) => {
    try {
      const response = await axios.put(`http://10.0.2.2:5000/employee/decision/${visitId}`, {
        decision: status,
      });

      if (response.data && response.data.message === 'Visit status updated successfully') {
        // Update the visit status in the local state
        setEmployeeRequests((prevEmployeeRequests) =>
          prevEmployeeRequests.map((visit) =>
            visit._id === visitId ? { ...visit, visitStatus: status } : visit
          )
        );
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error updating visit status:', error);
    }
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestText}>{`Visitor: ${item.visitorName}`}</Text>
      <Text style={styles.requestText}>{`Contact Details: ${item.contactDetails}`}</Text>
      <Text style={styles.requestText}>{`Visit Date: ${item.visitDate}`}</Text>
      <Text style={styles.requestText}>{`Visit Time: ${item.visitTime}`}</Text>
      <Text style={styles.requestText}>{`Visit Status: ${item.visitStatus}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonaccept} onPress={()=>handleStatusUpdate(item._id,"ACCEPTED")}>
          <Text style={styles.buttonTextaccept}>ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonreject} onPress={()=> handleStatusUpdate(item._id , "REJECTED")} >
          <Text style={styles.buttonTextreject}>REJECT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Employee Requests</Text>
      {employeeRequests.length === 0 ? (
        <Text>No visit requests found.</Text>
      ) : (
        <FlatList
          data={employeeRequests}
          keyExtractor={(item) => item._id}
          renderItem={renderRequestItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccff66',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestItem: {
    backgroundColor: '#e0ffe0',
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 3,
    width : 350
  },
  requestText: {
    fontSize: 17,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonaccept: {
    backgroundColor: '#66ff66',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    
  },
  buttonreject: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonTextaccept: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextreject: {
    color: '#ffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
