import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { fetchExercises, createWorkout } from '../api/api';

const CreateWorkoutScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    fetchExercises()
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
      sets: 3, // You can add input fields to customize sets and reps
      reps: 10,
    }));

    createWorkout({
      exercises: workoutData,
      notes: 'My custom workout',
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
            <Title style={styles.heading}>{item}</Title>
            {exercises[item].map((exercise) => (
              <TouchableRipple
                key={exercise._id}
                style={[
                  styles.item,
                  selectedExercises.find((item) => item._id === exercise._id) ? styles.selectedItem : null,
                ]}
                onPress={() => toggleExerciseSelection(exercise)}
              >
                <Card>
                  <Card.Content>
                    <Title>{exercise.name}</Title>
                    <Paragraph>{exercise.description}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableRipple>
            ))}
          </View>
        )}
      />
      <Button mode="contained" onPress={saveWorkout} style={styles.button}>
        Save Workout
      </Button>
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
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: '#c2f9ff',
  },
  button: {
    margin: 20,
  },
});

export default CreateWorkoutScreen;
