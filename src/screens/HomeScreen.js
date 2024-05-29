import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Workout Tracker</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Workout')}>
        Go to Workout
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('ExerciseList')}>
        Go to Exercise List
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('CreateWorkout')}>
        Create Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
