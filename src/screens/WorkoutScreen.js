import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjk3MzY0NSwiZXhwIjoxNzE3MDYwMDQ1fQ.TjCeCTnOn7qkGdxEI84NHfn05NPeexYn3RRf8hYyFww'
      }
    })
    .then(response => {
      setWorkouts(response.data);
    })
    .catch(error => {
      console.error('Error fetching workouts:', error);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
    >
      <Text style={styles.title}>Workout on {new Date(item.date).toLocaleDateString()}</Text>
      {item.exercises.map((exercise, index) => (
        <Text key={index} style={styles.subtitle}>
          {exercise.exercise.name}: {exercise.sets} sets x {exercise.reps} reps
        </Text>
      ))}
      <Text style={styles.notes}>{item.notes}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  notes: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default WorkoutScreen;
