import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from '../components/movies/MovieList'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import type { MovieListProps, Movie } from '../types/app'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [detailMovie, setDetailMovie] = useState<Movie | null>(null)

  useEffect(() => {
    getDetailMovie()
  }, [id])

  const getDetailMovie = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setDetailMovie(data)
        console.log(data)
      })
      .catch((errorResponse) => {
        console.log('Error fetching movie details:', errorResponse)
      })
    
  }
  console.log(detailMovie)

  const recomendations : MovieListProps = {
    title: 'Recomendations',
    path: `/movie/${id}/recommendations`,
    coverType: 'poster',
  }

  if (!detailMovie) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {detailMovie.backdrop_path ? (
        <ImageBackground
          resizeMode="cover"
          source={{ uri: `https://image.tmdb.org/t/p/w500${detailMovie.backdrop_path}` }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
          <Text style={styles.movieTitle}>{detailMovie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={18} color="yellow" />
            <Text style={styles.rating}>{detailMovie.vote_average.toFixed(1)}</Text>
          </View>
      </LinearGradient>
        </ImageBackground>
        
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}
     
      <View style={styles.detailsContainer}>
        <Text style={styles.overview}>{detailMovie.overview}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Original Language</Text>
            <Text style={styles.infoValue}>{detailMovie.original_language}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Popularity</Text>
            <Text style={styles.infoValue}>{detailMovie.popularity}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Release Date</Text>
            <Text style={styles.infoValue}>{new Date(detailMovie.release_date).toDateString()}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Vote Count</Text>
            <Text style={styles.infoValue}>{detailMovie.vote_count}</Text>
          </View>
        </View>
      </View>
      {/* Add Recommendations here */}
      <MovieList
          title={recomendations.title}
          path={recomendations.path}
          coverType={recomendations.coverType}
          key={recomendations.title}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: 220,
  },
  noImage: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  noImageText: {
    color: '#888',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2
  },
  rating: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2
  },
  gradientStyle: {
    padding: 8,
    height: 220,
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  voteAverage: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoColumn: {
    flex: 1,
    paddingHorizontal: 5,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
  },
})

export default MovieDetail