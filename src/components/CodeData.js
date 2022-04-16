export const textOne =
  "Cd into your preferred directory and create a new python project locally using this command";
export const textTwo =
  "Create a virtual environment to avoid clogging up our global installations:";
export const textThree = "Install Python libraries & launch VS Code:";
export const textFour =
  "Create a .env file with all of the environment variables:";
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
export const pythonTwo = `from dotenv import load_dotenv
import os
import praw
from praw.models import MoreComments
from supabase import create_client, Client
from stocksymbol import StockSymbol`;
