# 732-project: Friend Finder
## MBTI: Predict the MBTI personalities of the commenters given tweets
data folder structure:
```
PySpark:  
    |- ETL_result        
    |- users.csv
    |- data_etl.py
kmeans:
    |- center_location.json
    |- fig_kmeans.png
    |- frame_with_ranking.csv
    |- kmeans.ipynb
    |- kmeans.py
mbti:
    |- preprocessing
    |- preprocessing.py
    |- MBTIClassifier.py (NN solution)
    |- MBTIDataset.py (NN solution)
    |- mbti_auto.py (NN solution, run this for easier fine tuning)
    |- mbti_manual.py (NN solution, run this for best performance acc=0.68)
    |- SVC.py (SVC solution, acc=0.68)
    |- mbti_1.csv.zip (datasets, should be unziped and placed in data folder)
    |- data
        |- mbti_1.csv
```

To generate data navigate to mbti directory, copy mbti_1.csv and users.csv to data directory and run
```
bash processing
```

## ETL

To run the .py file:
```
spark-submit data_etl.py
```

## K-Means

Run the .py file to train the model :
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
The following node version is required
Node=14.15.5
