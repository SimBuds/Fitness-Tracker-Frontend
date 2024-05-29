import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { fetchWorkouts } from '../api/api';

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts()
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableRipple
      style={styles.item}
      onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
    >
      <Card>
        <Card.Content>
          <Title>Workout on {new Date(item.date).toLocaleDateString()}</Title>
          {item.exercises.map((exercise, index) => (
            <Paragraph key={index}>
              {exercise.exercise.name}: {exercise.sets} sets x {exercise.reps} reps
            </Paragraph>
          ))}
          <Paragraph style={styles.notes}>{item.notes}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  notes: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default WorkoutScreen;
