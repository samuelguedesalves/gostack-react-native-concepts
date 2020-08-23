import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


import api from './services/api';


export default function App() {
  const [ repositories, setRepositories ] = useState([]);

  const [reRendering, setReRendering] = useState(false);

  useEffect(() => {
      api.get('/repositories').then( response => {console.log(response); setRepositories(response.data)} );
  }, []);

  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then( () => {
      const repositorieIndex = repositories.findIndex( repositorie => repositorie.id === id );
      
      const newRepositoriesListage = repositories;

      newRepositoriesListage[repositorieIndex].likes = (newRepositoriesListage[repositorieIndex].likes) + 1;
      
      setRepositories(newRepositoriesListage);
      setReRendering(true);
      
    } );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
        <FlatList
          extraData={reRendering}
          data={repositories} 
          keyExtractor={repositorie => repositorie.id}
          renderItem={ ({item}) => {
            setReRendering(false);
            return (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  {item.techs.split(',').map( (tech, index) => (
                    <Text key={index} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-1`}
                  >
                    {item.likes}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-1`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
              

            )} }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
