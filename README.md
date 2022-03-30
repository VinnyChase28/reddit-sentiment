## Get started

To serve the project:

Prerequisites:

- A reddit account and app
- A Supabase account with two tables: crypto_mentions and ticker_mentions. The columns should be set up like so:
  - id (key)
  - created_at
  - ticker
  - comment
  - source
  - sentiment
  - (Optional) A free Heroku account for scheduling scripts, you can also simply run the script locally

```bash
npm install
```

```bash
npm run dev
```

![alt text](https://i.imgur.com/gP4mXwh.png)

## Known issues / bugs

- Not mobile friendly (especially the bar charts)

## Roadmap

- Add sentiment analysis (reddit comments are already scraped and available, just need to implement) and set sentiment to "Bearish" or "Bullish" in Supabase
- Display different graphs and overtime graphs
- Makes comparisons of # of mentions to stock performance

## List of resources

- [Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started)
- [Praw / Comment extraction & parsing](https://praw.readthedocs.io/en/latest/tutorials/comments.html)
