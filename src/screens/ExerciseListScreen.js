import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { getExercises } from '../api/api';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await getExercises();
      const sections = Object.keys(response).map(key => ({
        title: key,
        data: response[key]
      }));
      setExercises(sections);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {exercises.length > 0 ? (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.exerciseContainer}
              onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: item._id })}
            >
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text>{item.workout_type}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      ) : (
        <Text>No exercises available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  exerciseContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExerciseListScreen;