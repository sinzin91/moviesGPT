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
  stream: true,
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  const fetchMoviesFromTMDB = async (movieData) => {
    console.log("fetching movie from TMDB...", movieData);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMBD_API_KEY}&query=${movieData.title}`
      );
      const data = await response.data;

      if (data.results.length > 0) {
        // get streaming services associated with the movie
        const movieId = data.results[0].id;
        const watchProviders = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMBD_API_KEY}`
        );

        const fetchedMovie = {
          ...data.results[0],
          rottenTomatoesScore: movieData.rottenTomatoesScore,
          watchProviders: countryCode
            ? { [countryCode]: watchProviders.data.results[countryCode] }
            : watchProviders.data.results,
        };

        console.log(fetchedMovie);
        setMovies((prevMovies) => {
          const updatedMovies = [...prevMovies, fetchedMovie].slice(0, 16);
          return updatedMovies;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoviesDataFromOpenAI = async (searchTerm, onMovieDataReceived) => {
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
  
                response: 
                { "title": "The Godfather", "rottenTomatoesScore": 98 }
                { "title": "On the Waterfront", "rottenTomatoesScore": 98 }
                { "title": "A Streetcar Named Desire", "rottenTomatoesScore": 98 }
                { "title": "The Godfather Part II", "rottenTomatoesScore": 98 }
                { "title": "Apocalypse Now", "rottenTomatoesScore": 98 }
  
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

      if (!response.body) {
        throw new Error("ReadableStream not yet supported in this browser.");
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();

      let accumulatedData = "";
      let lastMovie = null;

      await new Promise(async (resolve, reject) => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("Stream finished.");
            break;
          }

          const decodedValue = textDecoder.decode(value);

          const jsonValue = decodedValue.substring(5); // Remove "data: " from the beginning

          // Build up the response from the stream
          try {
            accumulatedData += JSON.parse(jsonValue).choices[0].text;
            const parsedData = JSON.parse(accumulatedData);

            // Check if the response is a movie object and not a duplicate
            if (parsedData.title && parsedData.title !== lastMovie) {
              accumulatedData = "";
              lastMovie = parsedData.title;
              // Trigger callback function to handle JSON parsed data
              onMovieDataReceived(parsedData);
            }
          } catch (e) {
            // Check if the accumulatedData contains a closing bracket '}'
            if (accumulatedData.includes("}")) {
              // Reset accumulatedData if it cannot be parsed
              accumulatedData = "";
            } else {
              // Ignore errors caused by incomplete JSON data
            }
          }
        }

        // Check if the response is an error message
        const extractedData = accumulatedData.replace(/\n/g, "").trim();
        if (extractedData.startsWith("Sorry")) {
          console.log("error: " + extractedData);
          setError(extractedData); // Set the error message to the content of extractedData
          resolve([]);
        } else {
          resolve();
        }
      });
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
      setMovies([]);

      const onMovieDataReceived = async (movieData) => {
        await fetchMoviesFromTMDB(movieData);
      };

      await fetchMoviesDataFromOpenAI(searchTerm, onMovieDataReceived);
      setLoading(false);
    }
  };

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  const FooterText = styled(Typography)`
    color: #828282;
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
        }}>
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
