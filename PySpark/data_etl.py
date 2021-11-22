import sys
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+

from pyspark.sql import SparkSession, functions, types


'''
 |-- _c0: string (nullable = true)
 |-- account_id: string (nullable = true)
 |-- handle: string (nullable = true)
 |-- name: string (nullable = true)
 |-- description: string (nullable = true)
 |-- url: string (nullable = true)
 |-- language: string (nullable = true)
 |-- location: string (nullable = true)
 |-- account_created_at: string (nullable = true)
 |-- account_created_at_interpolated: string (nullable = true)
 |-- crawled_at: string (nullable = true)
 |-- missing: string (nullable = true)
 |-- protected: string (nullable = true)
 |-- followers_count: string (nullable = true)
 |-- following_count: string (nullable = true)
 |-- statuses_count: string (nullable = true)
 |-- listed_count: string (nullable = true)
 |-- last_post_id: string (nullable = true)
 |-- last_post_text: string (nullable = true)
 |-- last_post_lat: string (nullable = true)
 |-- last_post_lon: string (nullable = true)
 |-- last_post_place_id: string (nullable = true)
 |-- last_post_created_at: string (nullable = true)
 |-- time_since_last_post: string (nullable = true)
'''


# add more functions as necessary

def main():
    # main logic starts here
    
    twitter = spark.read.option("header",True).csv('users.csv')
    print(twitter.count())
    twitter = twitter.select('account_id','followers_count','following_count','statuses_count','listed_count','last_post_created_at','account_created_at')
    twitter = twitter.filter(twitter.account_created_at.isNotNull())
    twitter = twitter.filter(twitter.account_id.isNotNull())
    twitter = twitter.filter(twitter.followers_count.isNotNull())
    twitter = twitter.filter(twitter.following_count.isNotNull())
    twitter = twitter.filter(twitter.statuses_count.isNotNull())
    twitter = twitter.filter(twitter.listed_count.isNotNull())
    twitter = twitter.filter(twitter.last_post_created_at.isNotNull())
    # twitter.show()

    twitter = twitter.withColumn('account_id',twitter['account_id'].cast(types.LongType()))
    twitter = twitter.withColumn('followers_count',twitter['followers_count'].cast(types.LongType()))
    twitter = twitter.withColumn('following_count',twitter['following_count'].cast(types.LongType()))
    twitter = twitter.withColumn('statuses_count',twitter['statuses_count'].cast(types.LongType()))
    twitter = twitter.withColumn('listed_count',twitter['listed_count'].cast(types.LongType()))
    twitter = twitter.withColumn('last_post_created_at',twitter['last_post_created_at'].cast(types.TimestampType()))
    twitter = twitter.withColumn('account_created_at',twitter['account_created_at'].cast(types.TimestampType()))
    twitter = twitter.withColumn('active_date', functions.datediff(twitter['last_post_created_at'],twitter['account_created_at'])  )
    twitter = twitter.select('account_id','followers_count','following_count','statuses_count','listed_count','active_date')
    twitter.printSchema()
    print(twitter.count())
    twitter.write.json('ETL_result', mode='overwrite')


    

if __name__ == '__main__':
    spark = SparkSession.builder.appName('twitter').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    main()

