export const intro =
  "This is a guide to show how to create a reddit comment scraper. I will start with reddit, and expand to other websites. The top 6 most popular stock subreddits as well as the top 6 crypto subreddits are scraped using PRAW, a python library to find how many times the tickers are mentioned. The comment is also recorded to do a sentiment analysis of the text. The sentiment analysis will try to determine if the user is 'Bearish' or 'Bullish' about a particular stock or cryptocurrency.";

export const textOne =
  "Cd into your preferred directory and create a new python project locally using this command";
export const textTwo =
  "Create a virtual environment to avoid clogging up our global installations:";
export const textThree = "Install Python libraries & launch VS Code:";
export const textFour =
  "Create a .env file with all of the environment variables:";
export const textFive =
  "Now we are ready to create a list of all existing stocks as well as connect to the Reddit API via PRAW:";
export const bashOne =
  "mkdir python-scraper && cd python-scraper && touch to-csv-crypto.py to-csv-stocks.py ticker-scraper-crypto.py ticker-scraper-stocks.py";
export const bashTwo = "sudo pip3 install virtualenv && virtualenv venv";
export const bashThree =
  "pip install supabase pandas dotenv praw stocksymbol requests && pip freeze >> requirements.txt && code .";
export const env = `SUPABASE_URL=supabase-url
SUPABASE_KEY=supabase-anon-key (browser safe)
CLIENT_ID=reddit-app-client-id
SECRET_TOKEN=reddit-app-secret
USERNAME=reddit-username
PASSWORD=reddit-password`;
export const pythonOne = `from dotenv import load_dotenv
import os
import praw
from praw.models import MoreComments
from supabase import create_client, Client
from stocksymbol import StockSymbol`;
export const pythonTwo = `#get a list of all existing stocks
api_key = os.environ.get("SYMBOL_KEY")
ss = StockSymbol(api_key)
symbol_list_us = ss.get_symbol_list(market="US")
tickers = []
for i in range(len(symbol_list_us)):
  tickers.append(symbol_list_us[i]['symbol'])
tickers_set = set(tickers)
#connect to Reddit via PRAW
reddit = praw.Reddit(
    client_id=os.environ.get("CLIENT_ID"),
    client_secret=os.environ.get("SECRET_TOKEN"),
    user_agent="YourAppName by u/your-username",
    ratelimit_seconds=300
)`;
export const pythonThree = `#Get hot submissions from 6 most popular trading subs / ensure submissions have comments
urls = []
url_check = 'comment'
for submission in reddit.subreddit("wallstreetbets").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)
for submission in reddit.subreddit("stocks").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)
for submission in reddit.subreddit("investing").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)
for submission in reddit.subreddit("superstonk").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)
for submission in reddit.subreddit("stockmarket").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)
for submission in reddit.subreddit("pennystocks").hot(limit=10):
    if url_check in submission.url:
      urls.append(submission.url)`;

export const pythonFour = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonFive = `#Send to Supabase
def words_in_string(word_list, a_string):
    return set(word_list).intersection(a_string.split())
for submission in submissions:
    submission.comments.replace_more(limit=None)
    for comment in submission.comments.list():
      for word in words_in_string(tickers_set, comment.body):
        data = supabase.table("ticker_mentions").insert({"ticker": word, 'comment': comment.body}).execute()`;

export const pythonSix = `from dotenv import load_dotenv
import os
import praw
from supabase import create_client, Client
from praw.models import MoreComments
from stocksymbol import StockSymbol
from apscheduler.schedulers.blocking import BlockingScheduler

# take environment variables from .env.
load_dotenv()  
#Initialize supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

sched = BlockingScheduler()
@sched.scheduled_job('cron', day_of_week='mon-sun', hour=5)
def scheduled_job():
  # Get all tickers and set the as a list
  api_key = os.environ.get("SYMBOL_KEY")
  ss = StockSymbol(api_key)
  symbol_list_us = ss.get_symbol_list(market="US")
  tickers = []
  for i in range(len(symbol_list_us)):
    tickers.append(symbol_list_us[i]['symbol'])
  tickers_set = set(tickers)
  tickers_set.remove("A")
  print(tickers_set)

  #Connect to Reddit API via PRAW
  reddit = praw.Reddit(
      client_id=os.environ.get("CLIENT_ID"),
      client_secret=os.environ.get("SECRET_TOKEN"),
      user_agent="WSBetter by u/relevant-magic-card",
      ratelimit_seconds=300
  )

  #Get hot submissions from 6 most popular trading subs / ensure submissions have comments
  urls = []
  url_check = 'comment'
  for submission in reddit.subreddit("wallstreetbets").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)
  for submission in reddit.subreddit("stocks").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)
  for submission in reddit.subreddit("investing").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)
  for submission in reddit.subreddit("superstonk").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)
  for submission in reddit.subreddit("stockmarket").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)
  for submission in reddit.subreddit("pennystocks").hot(limit=10):
      if url_check in submission.url:
        urls.append(submission.url)

  submissions = []
  for url in urls:
    submissions.append(reddit.submission(url=url))
  print(submissions)

  #Send to Supabase
  def words_in_string(word_list, a_string):
      return set(word_list).intersection(a_string.split())
  for submission in submissions:
      submission.comments.replace_more(limit=None)
      for comment in submission.comments.list():
        for word in words_in_string(tickers_set, comment.body):
          data = supabase.table("ticker_mentions").insert({"ticker": word, 'comment': comment.body}).execute()


sched.start()`;

export const pythonSeven = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonEight = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonNine = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonTen = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonEleven = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;

export const pythonTwelve = `submissions = []
for url in urls:
  submissions.append(reddit.submission(url=url))
print(submissions)`;
