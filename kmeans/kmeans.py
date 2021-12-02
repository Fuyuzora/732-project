# %%
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
# from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import Normalizer
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
# from sklearn.model_selection import train_test_split 

# %%
dataset_dir = '../PySpark/ETL_result'
dir_contents = os.listdir(dataset_dir)
dir_contents.sort()
for f in dir_contents:
	print(f) if f.endswith('.csv') else None

# %%
twitter_col = ['account_id', 'followers_count', 'following_count', \
    'post_count', 'listed_count', 'active_date']
df = pd.DataFrame(columns = twitter_col)

for f in dir_contents:
    if f.endswith('.csv'):
        df1 = pd.read_csv(dataset_dir + '/' + f, names = twitter_col)
        df = pd.concat([df, df1])

# %%
df.isnull().sum()

# %%
df.dropna(subset = ['account_id'], inplace=True)
df['active_date'].fillna(df['active_date'].mean(), inplace=True)
df.isnull().sum()

# %%
df.head()

# %%
df.info()

# %%
features = df.iloc[:,1:]
print(features.info())
print(features.head())

# %%
features_norm = Normalizer().fit_transform(features)
features_norm = pd.DataFrame(features_norm, columns = list(features.columns))
print('Normalized Features')
print(features_norm.head())

# %%
# X_train, X_test = train_test_split(features_norm, test_size=0.2)
# X_train = X_train.iloc[:,1:]
# X_test = X_test.iloc[:,1:]
# print(X_train.shape)
# print(X_test.shape)
# print(X_train.head())

# %%
# sum of square distances. insertia
SSE = []
for cluster in range(1,20):
    kmeans = KMeans(n_clusters = cluster, init='k-means++')
    kmeans.fit(features_norm)
    SSE.append(kmeans.inertia_)

# sse elbow plot
sse_df = pd.DataFrame({'Cluster':range(1,20), 'SSE':SSE})
plt.figure(figsize=(12,6))
plt.plot(sse_df['Cluster'], sse_df['SSE'], marker='o')
plt.title('Optimal Number of Clusters')
plt.xlabel('Number of clusters')
plt.ylabel('Inertia')
plt.show()

# %%
# use PCA to convert dimension to 2
pca = PCA(2)
data = pca.fit_transform(features_norm)

# fitting multiple k-means algorithms
k = 15
model = KMeans(n_clusters = k, init='k-means++')
model.fit(data)
pred = model.predict(data)
uniq = np.unique(pred)

centers = np.array(model.cluster_centers_)

# plot clusters
plt.figure(figsize=(12,12))

for i in uniq:
   plt.annotate(i, (centers[:,0][i], centers[:,1][i]), fontsize=18)
   plt.scatter(data[pred == i , 0], data[pred == i , 1], s = 2, label = i)
plt.scatter(centers[:,0], centers[:,1], marker='x', color='k')
plt.legend()
plt.show()

# %%
frame = features_norm.copy()
frame['cluster'] = pred
print(frame['cluster'].value_counts())
print(frame.head())

# %%


# %%


# %%



