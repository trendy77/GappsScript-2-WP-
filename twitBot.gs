// org MyBiz Bot - 28 july'17

// Fill the Twitter Keys and then choose Run -> Start Bot

//organisemybizbot
TWITTER_CONSUMER_KEY = "wTU8Ntmn3q5nN7OrwdXfBn7Xx";
TWITTER_CONSUMER_SECRET = "fqlbIEnIHY4fEBmVoPnqIV7j5JN6doDuh4QLEVLjGmLb59jg9N";
TWITTER_ACCESS_TOKEN = "754663243465891840-FFZjZRlOT84GY0YTvoKugAkMcwW7YeT";
TWITTER_ACCESS_SECRET = "8mQiNYUIMGiCTqifFEiMJBIIrJkPLvd5ZybFFUdas1hhZ";
TWITTER_SEARCH_PHRASE = "#SME";

function Start_Bot() {

    var props = PropertiesService.getScriptProperties();

    props.setProperties({
        TWITTER_CONSUMER_KEY: TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
        TWITTER_ACCESS_TOKEN: TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_SECRET: TWITTER_ACCESS_SECRET,
        SINCE_TWITTER_ID: 0
    });

      // Test Twitter authorization

    if (!twit.favorite("754663243465891840")) {
        throw new Error("Please check your Twitter access tokens");
        return;
    }
	    if (!twit.favorite("817542417788194816")) {
        throw new Error("Please check your Twitter access tokens");
        return;
    }

    ScriptApp.newTrigger("orgbiz_twitterBot")
        .timeBased()
        .everyMinutes(10)
        .create();

}

function orgbiz_twitterBot() {

    try {

        var props = PropertiesService.getScriptProperties(),
            twit = new Twitter.OAuth(props);

        if (twit.hasAccess()) {

            var tweets = twit.fetchTweets(
                TWITTER_SEARCH_PHRASE,
                function(tweet) {
                    // Skip tweets that contain sensitive content
                    if (!tweet.possibly_sensitive) {
                        return tweet.id_str;
                    }
                }, {
                    multi: true,
                    lang: "en", // Process only English tweets
                    count: 50, // Process 5 tweets in a batch
                    since_id: props.getProperty("SINCE_TWITTER_ID")
                });

            if (tweets) {

                props.setProperty("SINCE_TWITTER_ID", tweets[0]);

                for (var i = tweets.length - 1; i >= 0; i--) {

                    twit.retweet(tweets[i]);
                    twit.favorite(tweets[i]);

                    /* Wait between 10 seconds and 1 minute */
                    Utilities.sleep(Math.floor(Math.random() * 50000) + 10000);

                }
            }
        }

    } catch (f) {
        Logger.log("Error: " + f.toString());
    }

}

function Stop_Bot() {
  
  var triggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
}