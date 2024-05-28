import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises from the API
    fetch('http://localhost:5000/api/exercises', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjkxMDQzMiwiZXhwIjoxNzE2OTk2ODMyfQ.sYVPZO9B9qKRrqo-di0Bdsq4NdxrcQuBgsZ4LsxBUZk'
      }
    })
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(exercises)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.heading}>{item}</Text>
            {exercises[item].map((exercise) => (
              <TouchableOpacity
                key={exercise._id}
                style={styles.item}
                onPress={() => navigation.navigate('ExerciseDetail', { exercise })}
              >
                <Text style={styles.title}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 18,
  },
});

export default ExerciseListScreen;
