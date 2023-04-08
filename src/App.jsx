import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import LocationPermissionCheckbox from "./components/LocationPermissionCheckbox.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

// Set OpenAI API key
const TMBD_API_KEY = import.meta.env.VITE_APP_TMBD_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;

const DEFAULT_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.1,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  const fetchMoviesFromTMDB = async (moviesData) => {
    console.log("fetching movies from TMDB...");
    const fetchedMovies = [];

    try {
      const moviesPromises = moviesData.map(async (movie) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMBD_API_KEY}&query=${movie.title}`
        );
        const data = await response.data;

        if (data.results.length > 0) {
          // get streaming services associated with the movie
          const movieId = data.results[0].id;
          const watchProviders = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMBD_API_KEY}`
          );

          return {
            ...data.results[0],
            rottenTomatoesScore: movie.rottenTomatoesScore,
            watchProviders: countryCode
              ? { [countryCode]: watchProviders.data.results[countryCode] }
              : watchProviders.data.results,
          };
        } else {
          return null;
        }
      });

      const movies = await Promise.all(moviesPromises);
      fetchedMovies.push(...movies);
      console.log(fetchedMovies);
      setMovies(fetchedMovies.slice(0, 16));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchMoviesDataFromOpenAI = async (searchTerm) => {
    setError(null);
    try {
      const prompt = `Return a JSON object movie titles that best match this search term and their Rotten Tomatoes tomatometer score, 
                ordered from most to least relevant. 
                Get the most up to date and accurate Rotten Tomatoes tomatometer score.
                Generate up to 12 titles.
                If you are unable to answer the question, return a string that starts with Sorry.
                The response must be a valid JSON.
  
                Example:
                prompt: "movies with brando"
                
                response: [
                  { "title": "The Godfather", "rottenTomatoesScore": 98 },
                  { "title": "The Godfather: Part II", "rottenTomatoesScore": 97 },
                  { "title": "Apocalypse Now", "rottenTomatoesScore": 96 },
                  { "title": "The Wild One", "rottenTomatoesScore": 85 }
                ]
  
                prompt: ${searchTerm}
                response:
                `;

      const params = {
        ...DEFAULT_PARAMS,
        prompt: prompt,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(OPENAI_API_KEY),
        },
        body: JSON.stringify(params),
      };

      const response = await fetch(
        "https://api.openai.com/v1/completions",
        requestOptions
      );

      const data = await response.json();
      console.log(data);

      const moviesData = data.choices[0].text
        // remove new lines and empty strings
        .replace(/\n/g, "")
        .trim();

      // Check if the response is an error message
      if (moviesData.startsWith("Sorry")) {
        console.log("error: " + moviesData);
        setError(moviesData); // Set the error message to the content of moviesData
        return [];
      }

      console.log(JSON.parse(moviesData));

      return JSON.parse(moviesData);
    } catch (error) {
      console.error(error);
      alert("Something went wrong: " + error.message);
      setLoading(false);
      return [];
    }
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm) {
      setLoading(true);
      const moviesData = await fetchMoviesDataFromOpenAI(searchTerm);
      await fetchMoviesFromTMDB(moviesData);
      setLoading(false);
    }
  };

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  const FooterText = styled(Typography)`
    color: #fff;
  `;

  const Footer = () => {
    return (
      <footer
        style={{
          padding: "10px",
          textAlign: "center",
          bottom: "50px",
          width: "100%",
          left: "0",
        }}
      >
        <FooterText variant="body2">
          Thank you OpenAI, TheMovieDB and JustWatch.
        </FooterText>
      </footer>
    );
  };
  
  

  return (
    <>
      <GlobalStyle />
      <main style={{ flex: "1", padding: "20px" }}>
        <Header />
        <SearchBar
          setSearchTerm={setSearchTerm}
          onSearchButtonClick={handleSearchButtonClick}
        />
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <LocationPermissionCheckbox
          onCountryCodeChange={handleCountryCodeChange}
        />
        <MovieGrid movies={movies} />
      </main>
      <Footer />
    </>
  );
};

export default App;
