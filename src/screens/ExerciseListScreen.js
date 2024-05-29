import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { fetchExercises } from '../api/api';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');

  useEffect(() => {
    fetchExercises()
      .then(response => {
        setExercises(response.data);
        setFilteredExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    setSearch(text);

    const newData = Object.keys(exercises).reduce((acc, key) => {
      const filtered = exercises[key].filter((exercise) =>
        exercise.name.toLowerCase().includes(text.toLowerCase())
      );
      if (filtered.length) {
        acc[key] = filtered;
      }
      return acc;
    }, {});

    setFilteredExercises(newData);
  };

  const filterByWorkoutType = (type) => {
    setSelectedWorkoutType(type);

    if (type === '') {
      setFilteredExercises(exercises);
      return;
    }

    const newData = Object.keys(exercises).reduce((acc, key) => {
      if (key === type) {
        acc[key] = exercises[key];
      }
      return acc;
    }, {});

    setFilteredExercises(newData);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Exercises..."
        lightTheme
        round
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        autoCorrect={false}
      />
      <Picker
        selectedValue={selectedWorkoutType}
        onValueChange={(itemValue) => filterByWorkoutType(itemValue)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Chest" value="Chest" />
        <Picker.Item label="Back" value="Back" />
        <Picker.Item label="Legs" value="Legs" />
        <Picker.Item label="Core" value="Core" />
        <Picker.Item label="Full Body" value="Full Body" />
        <Picker.Item label="Shoulders" value="Shoulders" />
      </Picker>
      <FlatList
        data={Object.keys(filteredExercises)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Title style={styles.heading}>{item}</Title>
            {filteredExercises[item].map((exercise) => (
              <TouchableRipple
                key={exercise._id}
                style={styles.item}
                onPress={() => navigation.navigate('ExerciseDetail', { exercise })}
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
});

export default ExerciseListScreen;
