import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, List, Card } from 'react-native-paper';

const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: exercise.image }} />
        <Card.Content>
          <Title>{exercise.name}</Title>
          <Paragraph>{exercise.description}</Paragraph>
          <Title style={styles.subTitle}>Steps:</Title>
          {exercise.steps.map((step, index) => (
            <List.Item
              key={index}
              title={`${index + 1}. ${step}`}
              left={() => <List.Icon icon="checkbox-blank-circle-outline" />}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  subTitle: {
    marginTop: 10,
  },
});

export default ExerciseDetailScreen;
