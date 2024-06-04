import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { createWorkout } from '../api/api';

const CreateWorkoutScreen = ({ navigation }) => {
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleAddWorkout = async () => {
    const newWorkout = { exercises, notes };
    try {
      await createWorkout(newWorkout);
      navigation.navigate('Workout');
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <Button title="Add Workout" onPress={handleAddWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default CreateWorkoutScreen;