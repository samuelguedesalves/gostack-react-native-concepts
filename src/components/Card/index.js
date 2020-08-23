import React from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function Card ({title, techs, likes, handleLikeRepository}) {
  return (
    <View style={styles.repositoryContainer}>
      <Text style={styles.repository}>{title}</Text>

      <View style={styles.techsContainer}>
        {techs.map( (tech, index) => (
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
          {likes}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLikeRepository(1)}
        // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
        testID={`like-button-1`}
      >
        <Text style={styles.buttonText}>Curtir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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