import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWorkoutById } from '../api/api';

const WorkoutDetailScreen = ({ route }) => {
  const { workoutId } = route.params;
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const response = await getWorkoutById(workoutId);
      setWorkout(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workout:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Notes: {workout.notes}</Text>
      <Text>Date: {new Date(workout.date).toLocaleDateString()}</Text>
      {workout.exercises.map(exercise => (
        <View key={exercise._id} style={styles.exerciseContainer}>
          <Text>Exercise: {exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  exerciseContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default WorkoutDetailScreen;