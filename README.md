# MoviesGPT
## Semantic Search for Movies using GPT-3.5

![demo](demo.gif)
_the hero keeps forgetting who he is_

MoviesGPT is a semantic search engine for movies. This means that the search term doesn't need to match the movie title or description, and can even just be a description of something that happens in the plot. It uses the OpenAI GPT-3.5 API to power natural language search over movies. I generated most of the code using GPT-4, so was able to go from "huh, wouldn't that be cool" to "hell yea it works" in a couple hours! I almost prefer this over Google, where I usually find links to listicles.


### How it works
We pass the user's query with a prompt describing what we want to `gpt-3.5-turbo` and get a valid array of movies as a response. Then we can just call The Movie Database API to get the movie details.

The prompt that got me 80% of the way there was:
```
You are a professional front end React developer. 
Show how you would build a front end that includes a search bar at the top. 
Below the search bar are six cards which include the movie cover with the title below it. 
Searches hit The Movie Database api's search endpoint with the search term. 
The results from the API call are used to update the cards below the search bar. 
The site uses a black and blue, dark mode style theme, with minimal UI components.
```

The more complicated way to build this would be to create word embeddings for the movie titles and descriptions, store those embeddings in some vector datastore, and then use cosine similarity (or some related algorithm) to find the most similar movies. GPT already has these embeddings since most of these movies are mentioned somewhere in the massive pretraining data, so it's a lot easier to just use that.


### Limitations
1. Movies that come out after late 2021 will not show up because GPT-3.5 was only trained on data before that. Given OpenAI just released Plugins for ChatGPT, I assume ChatGPT will be able to query the latest movies soon. If you ask for movies that came out in 2022, GPT responds with `Sorry, as an AI language model, I don't have information about future movies.` 
2. I really wanted to include Rotten Tomatoes ratings, but the API is not free.
3. _Some_ results seem questionable, but 🤷 this is mostly a fun/experimental project.
4. GPT-3.5 is a bit neutered, so asking for movies that it thinks are inappropriate results in the usual "Sorry, but as a language model..." `text-davinci-003` doesn't seem to have the same restrictions.


### Setup
1. Clone the repo
2. Install the dependencies: `yarn install`
3. Create a `.env` file in the root directory and add the following:
```
VITE_APP_OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
VITE_APP_TMBD_API_KEY="YOUR_TMDB_API_KEY"
```
4. Run the app: `yarn dev`

### Contributing
If you have a neat idea and want to contribute, feel free to open a PR or issue. 
