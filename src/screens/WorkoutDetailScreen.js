import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WorkoutDetailScreen = ({ route }) => {
  const { workout } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout on {new Date(workout.date).toLocaleDateString()}</Text>
      {workout.exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>{exercise.exercise.name}</Text>
          <Text style={styles.exerciseDetail}>{exercise.sets} sets x {exercise.reps} reps</Text>
        </View>
      ))}
      <Text style={styles.notesTitle}>Notes:</Text>
      <Text style={styles.notes}>{workout.notes}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exerciseContainer: {
    marginBottom: 15,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  exerciseDetail: {
    fontSize: 16,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  notes: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WorkoutDetailScreen;
