import re, math, string, os
import pandas as pd
from langdetect import detect

tweets_path = 'data/users.csv'
mbti_path = 'data/mbti_1.csv'
output_path = 'data/preprocessed/'

tweets = pd.read_csv(tweets_path, on_bad_lines='skip', encoding_errors='ignore')
mbti = pd.read_csv(mbti_path)

def remove_url(line):
    urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', line)
    return line if len(urls) == 0 else None

def remove_non_en(line):
    if line == 'nan':
        return None
    language = detect(line)
    return line if language == 'en' else None

def remove_at_symbol(line):
    at_str = re.findall('(?<=@)(\w+)', line)
    if len(at_str) == 0:
        return line
    for s in at_str:
        line = line.replace(s, '')
    return line

def remove_punct(line):
    table = str.maketrans(dict.fromkeys(string.punctuation))
    line = line.translate(table)
    return line

tweets = tweets.loc[tweets['missing']==0]
tweets['last_post_text'] = tweets['last_post_text'].astype(str)
tweets['last_post_text'] = tweets['last_post_text'].apply(remove_url)
tweets = tweets.dropna()
tweets['last_post_text'] = tweets['last_post_text'].apply(remove_non_en)
tweets = tweets.dropna()
mbti['posts'] = mbti['posts'].apply(remove_url)
mbti = mbti.dropna()
tweets['last_post_text'] = tweets['last_post_text'].apply(remove_at_symbol).apply(remove_punct)
mbti['posts'] = mbti['posts'].apply(remove_at_symbol).apply(remove_punct)

if not os.path.exists(output_path):
    os.mkdir(output_path)
tweets[['account_id', 'last_post_text']].to_csv(output_path+'/tweets.csv')
mbti.to_csv(output_path+'/mbti.csv')
