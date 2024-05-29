import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateWorkoutScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/exercises', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjk3MzY0NSwiZXhwIjoxNzE3MDYwMDQ1fQ.TjCeCTnOn7qkGdxEI84NHfn05NPeexYn3RRf8hYyFww'
      }
    })
    .then(response => {
      setExercises(response.data);
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
    });
  }, []);

  const toggleExerciseSelection = (exercise) => {
    const isSelected = selectedExercises.find((item) => item._id === exercise._id);
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter((item) => item._id !== exercise._id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const saveWorkout = () => {
    const workoutData = selectedExercises.map((exercise) => ({
      exercise: exercise._id,
      sets: 3,
      reps: 10,
    }));

    axios.post('http://localhost:5000/api/workouts', {
      exercises: workoutData,
      notes: 'My custom workout',
    }, {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjk3MzY0NSwiZXhwIjoxNzE3MDYwMDQ1fQ.TjCeCTnOn7qkGdxEI84NHfn05NPeexYn3RRf8hYyFww'
      }
    })
    .then(response => {
      console.log('Workout created:', response.data);
      navigation.goBack();
    })
    .catch(error => {
      console.error('Error creating workout:', error);
    });
  };

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
                style={[
                  styles.item,
                  selectedExercises.find((item) => item._id === exercise._id) ? styles.selectedItem : null,
                ]}
                onPress={() => toggleExerciseSelection(exercise)}
              >
                <Text style={styles.title}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <Button title="Save Workout" onPress={saveWorkout} />
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
  selectedItem: {
    backgroundColor: '#c2f9ff',
  },
  title: {
    fontSize: 18,
  },
});

export default CreateWorkoutScreen;