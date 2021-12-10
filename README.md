# 732-project: Friend Finder
## MBTI: Predict the MBTI personalities of the commenters given tweets
data folder structure:
```
PySpark:    
    |- users.csv
    |- data_etl.py
kmeans:
    |- fig_kmeans.png
    |- kmeans.ipynb
    |- kmeans.py
mbti:
    |- preprocessing
    |- preprocessing.py
    |- data
        |- mbti_1.csv
        |- users.csv
        |- preprocessed
            |- mbti.csv
            |- tweets.csv
```

To generate data navigate to mbti directory, copy mbti_1.csv and users.csv to data directory and run
```
bash processing
```

## Twitter Networking Analysis:

Write a brief discription and get starting code here

## ETL

To run the .py file:
```
spark-submit data_etl.py
```

## K-Means

To run the .py file:
```
python3 kmeans.py
```

## Frontend: Presents MBTI classification, Networking analysis and a interactive demo

Install dependencies with [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) or npm:
```
yarn install
```

To run with yarn, first navigate to the frontend folder:
```
yarn start
```
