const Twit = require('twit');
require('dotenv').config({ path: 'variables.env' });

const bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

// Post a tweet!

// bot.post(
//   'statuses/update',
//   { status: "Hello, I am Michael Friedman's Twitter Bot." },
//   (err, data, response) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(data.text + ' was tweeted.');
//     }
//   },
// );

// Get a list of followers by screen_name or id
// followers/id
bot.get(
  'followers/list',
  { screen_name: 'ui_engineer' },
  (err, data, response) => {
    if (err) {
      console.error(err);
    } else {
      data.users.map(user => console.log(user.screen_name));
    }
  },
);

// bot.post('friendships/create', { screen_name: });

// Check following / follower relationship
bot.get(
  'friendships/lookup',
  { screen_name: 'alex_mazaltov' },
  (err, data, _res) => (err ? console.error(err) : console.log(data)),
);

// Send a DM
/*
bot.post(
  'direct_messages/new',
  {
    screen_name: 'IrisShields13',
    text: "Hey, I'm ui_engineer's twitter bot, talking to you programatically through Node.js like a G boss.",
  },
  (err, data, _res) => (err ? console.error(err) : console.log(data)),
);
*/

// Get last X tweets from timeline
const getBotTimeline = () => {
  bot.get(
    'statuses/home_timeline',
    { count: 5 },
    (err, data, _res) =>
      (err
        ? console.error(err)
        : data.map(tweet => {
            console.log(tweet.text);
            console.log(tweet.user.screen_name);
            console.log(tweet.id_str);
            console.log('\n');
          })),
  );
};

// retweet
const retweet = () => {
  bot.post(
    'statuses/retweet/:id',
    { id: '872531593432363008' },
    (err, data, _res) =>
      (err ? console.error(err) : console.log(`${data.text} was retweeted.`)),
  );
};

// retweet
const unretweet = () => {
  bot.post(
    'statuses/unretweet/:id',
    { id: '872531593432363008' },
    (err, data, _res) =>
      (err ? console.error(err) : console.log(`${data.text} was retweeted.`)),
  );
};

unretweet();
