import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getExerciseById } from '../api/api';

const ExerciseDetailScreen = ({ route }) => {
  const { exerciseId } = route.params;
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExercise();
  }, []);

  const fetchExercise = async () => {
    try {
      const response = await getExerciseById(exerciseId);
      console.log('Fetched Exercise:', response);
      setExercise(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      setError('Error fetching exercise');
      setLoading(false);
    }
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {exercise ? (
        <>
          <Text style={styles.name}>Name: {exercise.name}</Text>
          <Text style={styles.type}>Type: {exercise.workout_type}</Text>
          <Text style={styles.description}>Description: {exercise.description}</Text>
          <Text style={styles.stepsHeader}>Steps:</Text>
          {exercise.steps.map((step, index) => (
            <Text key={index} style={styles.step}>{step}</Text>
          ))}
          {exercise.image ? (
            <>
              <Text style={styles.imageHeader}>Image:</Text>
              <Image source={{ uri: exercise.image }} style={styles.image} />
            </>
          ) : null}
          {exercise.video ? (
            <>
              <Text style={styles.videoHeader}>Video:</Text>
              <TouchableOpacity onPress={() => handleOpenURL(exercise.video)}>
                <Text style={styles.videoLink}>{exercise.video}</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>
      ) : (
        <Text>Exercise not found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 18,
    color: 'gray',
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
  },
  stepsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  step: {
    fontSize: 16,
    marginLeft: 10,
  },
  imageHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  videoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ExerciseDetailScreen;