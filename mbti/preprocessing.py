import re, math, string, os
import pandas as pd
from langdetect import detect

tweets_path = 'data/users.csv'
mbti_path = 'data/mbti_1.csv'
output_path = 'data/preprocessed/'

tweets = pd.read_csv(tweets_path, on_bad_lines='skip', encoding_errors='ignore')
mbti = pd.read_csv(mbti_path)

def remove_url(line):
    urls = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', line)
    return urls

def remove_non_alphanumeric(line):
    line = line.strip()
    line = re.sub(r'[^A-Za-z0-9 ]+', '', line)
    return line

def vectorize_type(t):
    if t not in t_list.keys():
        t_list[t] = len(t_list)
    return t_list[t]

t_list = {}
tweets = tweets.loc[tweets['missing']==0]
tweets['last_post_text'] = tweets['last_post_text'].astype(str)
tweets['last_post_text'] = tweets['last_post_text'].apply(remove_url).apply(remove_non_alphanumeric)
tweets = tweets.dropna()
mbti['posts'] = mbti['posts'].apply(remove_url).apply(remove_non_alphanumeric)
mbti = mbti.dropna()
mbti['label'] = mbti['type'].apply(vectorize_type)

if not os.path.exists(output_path):
    os.mkdir(output_path)
tweets[['account_id', 'last_post_text']].to_csv(output_path+'/tweets.csv', index=False)
print('Created {} entries for tweets dataset'.format(len(tweets)))
print('Created {} entries for mbti dataset'.format(len(mbti)))
mbti.to_csv(output_path+'/mbti.csv', index=False)