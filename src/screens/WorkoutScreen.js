import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getWorkouts } from '../api/api';

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await getWorkouts();
      console.log('Fetched Workouts:', response);
      setWorkouts(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {workouts.length > 0 ? (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workoutContainer}
              onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item._id })}
            >
              <Text style={styles.notes}>{item.notes}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
              <FlatList
                data={item.exercises}
                keyExtractor={(exercise) => exercise._id}
                renderItem={({ item: exercise }) => (
                  <View style={styles.exerciseContainer}>
                    <Text>Sets: {exercise.sets}</Text>
                    <Text>Reps: {exercise.reps}</Text>
                  </View>
                )}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No workouts available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  workoutContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  notes: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  exerciseContainer: {
    marginTop: 5,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default WorkoutScreen;