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
  - (Optional) A free Heroku account for scheduling cron jobs, you can also simply run the script locally

```bash
npm install
```

```bash
npm run dev
```

![alt text](https://i.imgur.com/mV0TSfO.png)

## Known issues / bugs

- Not fully mobile friendly yet (especially the bar charts)

## Roadmap

- Conduct a sentiment analysis (reddit comments are already scraped and available, just need to implement) and set sentiment to "Bearish" or "Bullish" comment row
- Display different graphs and chart variations, create 100% from scratch 
- Makes comparisons of # of mentions to actual stock performance/stock charts

## List of resources

- [Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started)
- [Praw / Comment extraction & parsing](https://praw.readthedocs.io/en/latest/tutorials/comments.html)
