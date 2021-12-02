import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split


dataset_dir = '../PySpark/ETL_result'
dir_contents = os.listdir(dataset_dir)
dir_contents.sort()
for f in dir_contents:
	print(f) if f.endswith('.csv') else None


twitter_col = ['account_id', 'followers_count', 'following_count', \
    'post_count', 'listed_count', 'active_date']
df = pd.DataFrame(columns = twitter_col)

for f in dir_contents:
    if f.endswith('.csv'):
        df1 = pd.read_csv(dataset_dir + '/' + f, names = twitter_col)
        df = pd.concat([df, df1])        


df.dropna(subset = ['account_id'], inplace=True)
df['active_date'].fillna(df['active_date'].mean(), inplace=True)


features = df.iloc[:,1:]
print(features.info())


features_norm = MinMaxScaler().fit_transform(features)
features_norm = pd.DataFrame(features_norm, columns = list(features.columns))


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
plt.xlabel('Number of clusters')
plt.ylabel('Inertia')


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
plt.figure(figsize=(10,10))
for i in uniq:
   plt.scatter(data[pred == i , 0], data[pred == i , 1], s = 2, label = i)
plt.scatter(centers[:,0], centers[:,1], marker='x', color='k')
plt.legend()
plt.show()


frame = features_norm.copy()
frame['cluster'] = pred
frame['cluster'].value_counts()


sns.pairplot(frame, hue='cluster', palette='deep')
