import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: exercise.image }} style={styles.image} />
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.description}>{exercise.description}</Text>
      <Text style={styles.subTitle}>Steps:</Text>
      {exercise.steps.map((step, index) => (
        <Text key={index} style={styles.step}>{index + 1}. {step}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  step: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ExerciseDetailScreen;
