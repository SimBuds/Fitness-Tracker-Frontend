import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/exercises', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjk3MzY0NSwiZXhwIjoxNzE3MDYwMDQ1fQ.TjCeCTnOn7qkGdxEI84NHfn05NPeexYn3RRf8hYyFww'
      }
    })
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
            <Text style={styles.heading}>{item}</Text>
            {filteredExercises[item].map((exercise) => (
              <TouchableOpacity
                key={exercise._id}
                style={styles.item}
                onPress={() => navigation.navigate('ExerciseDetail', { exercise })}
              >
                <Text style={styles.title}>{exercise.name}</Text>
              </TouchableOpacity>
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
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 18,
  },
});

export default ExerciseListScreen;