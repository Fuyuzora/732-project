import pandas as pd
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt
from tqdm import tqdm
import nltk
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
import seaborn as sns
import re
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC,LinearSVC
from sklearn.ensemble import RandomForestClassifier,GradientBoostingClassifier
from wordcloud import WordCloud, STOPWORDS
import plotly.express as px
from IPython.display import display
import warnings
warnings.filterwarnings('ignore')
data0=pd.read_csv('mbti_1.csv')

data0['Words per Comment'] = data0['posts'].apply(lambda x: len(x.split(" "))/50)
# plt.figure(figsize=(15,10))
# sns.swarmplot("type", "Words per Comment", data=data0)
# plt.show()

# display(data0)
print(data0.describe(include='O'))
print(data0['type'].value_counts())
train, test=train_test_split(data0,test_size=0.2,random_state=42,stratify=data0.type)

def preprocessing(data):
       length = []
       lemmatizer = WordNetLemmatizer()
       clean_txt = []
       for cmt in tqdm(data.posts):
              cmt = cmt.lower()
              cmt = re.sub('https?://[^\s<>"]+|www\.[^\s<>"]+', ' ', cmt)
              cmt = re.sub('[^0-9a-z]', ' ', cmt)
              length.append(len(cmt.split()))
              clean_txt.append(cmt)
       return clean_txt, length

class Lemmatizer(object):
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
    def __call__(self, cmt):
        return [self.lemmatizer.lemmatize(word) for word in cmt.split() if len(word)>2]

train.posts, train_len = preprocessing(train)
# display(train)
test.posts, test_len = preprocessing(test)
# display(test)

# k = 0
# for i in data0['type'].unique():
#     data1 = data0[data0['type'] == i]
#     wordcloud = WordCloud().generate(data1['posts'].to_string())
#     plt.figure(figsize=(15, 10))
#     plt.axis('off')
#     plt.imshow(wordcloud)
#     plt.show()
#     k+=1


# plt.figure(figsize=(15,10))
# sns.distplot(train_len,label='train data word length')
# sns.distplot(test_len,label='test data word length')
# plt.title('Number of words in text',fontdict={'size':20,'style':'italic'})
# plt.show()

piechat = px.pie(train, names='type', title='MBTI type', hole=0.0)
piechat.update_traces(title = 'MBTI TYPE', title_font = dict(size=25,family='Verdana', color='darkred'), hoverinfo='label+percent', textinfo='percent', textfont_size=25)
piechat.update_layout(uniformtext_minsize=25, uniformtext_mode='hide', legend=dict(x=1, y=1, font=dict(size=28)))
piechat.show()

vectorizer = TfidfVectorizer(max_features=5000, stop_words='english', tokenizer=Lemmatizer())
vectorizer.fit(train.posts)
word_list = vectorizer.get_feature_names()

print("word_list: ", word_list)
# wordcloud = WordCloud(max_words=100)
# wordcloud.generate(' '.join(word for word in word_list[1:3000]))
# plt.figure(figsize=(15, 10))
# plt.axis('off')
# plt.imshow(wordcloud)
# plt.show()

train_cmt = vectorizer.transform(train.posts).toarray()
test_cmt = vectorizer.transform(test.posts).toarray()

target_encoder = LabelEncoder()
train_type = target_encoder.fit_transform(train.type)
test_type = target_encoder.fit_transform(test.type)

model_LinearSVC = LinearSVC(C=0.1)
model_LinearSVC.fit(train_cmt, train_type)

print('train classification report \n ', classification_report(train_type, model_LinearSVC.predict(train_cmt), target_names=target_encoder.inverse_transform([i for i in range(16)])))
print('test classification report \n ', classification_report(test_type, model_LinearSVC.predict(test_cmt), target_names=target_encoder.inverse_transform([i for i in range(16)])))

model_RandomForest = RandomForestClassifier(max_depth=15)
model_RandomForest.fit(train_cmt, train_type)

print('train classification report \n ')
print(classification_report(train_type, model_RandomForest.predict(train_cmt), target_names=target_encoder.inverse_transform([i for i in range(16)])))
print('test classification report \n ')
print(classification_report(test_type, model_RandomForest.predict(test_cmt), target_names=target_encoder.inverse_transform([i for i in range(16)])))





