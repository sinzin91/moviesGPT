# MoviesGPT
## Semantic Search for Movies using GPT-3.5

![demo](demo.gif)

MoviesGPT is a semantic search engine for movies. This means that the search term doesn't need to match the movie title or description, and can even just be a description of something that happens in the plot. It uses the OpenAI GPT-3.5 API to power natural language search over movies. I generated most of the code using GPT-4, so was able to go from "huh, wouldn't that be cool" to "hell yea it works" in a couple hours!

### How it works
We pass the user's query with a prompt describing what we want to `gpt-3.5-turbo` and get a valid array of movies as a response. Then we can just call The Movie Database API to get the movie details.

### Limitations
1. Movies that come out after late 2021 will not show up because GPT-3.5 was only trained on data before that. Given OpenAI just released Plugins for ChatGPT, I assume ChatGPT will be able to query the latest movies semantically soon.
2. I really wanted to include Rotten Tomatoes ratings, but the API is not free.
3. _Some_ results seem questionable, but 🤷 this is mostly a fun project.

### Setup
1. Clone the repo
2. Install the dependencies: `yarn install`
3. Create a `.env` file in the root directory and add the following:
```
VITE_APP_OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
VITE_APP_TMBD_API_KEY="YOUR_TMDB_API_KEY"
```
4. Run the app: `yarn dev`
