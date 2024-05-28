import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Workout Tracker</Text>
      <Button
        title="Go to Workout"
        onPress={() => navigation.navigate('Workout')}
      />
      <Button
        title="Go to Exercise List"
        onPress={() => navigation.navigate('ExerciseList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default HomeScreen;
