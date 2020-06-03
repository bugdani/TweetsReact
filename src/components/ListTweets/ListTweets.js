import React from "react";
import { Grid } from "@material-ui/core";
import Tweet from "../Tweet";

import "./ListTweets.scss";

export default function ListTweets(props) {
  const { allTweets, deleteTweet } = props;
  if (!allTweets || allTweets.length === 0) {
    return <h2 className="list-tweets-empty">No hay tweets</h2>;
  }
  return (
    <Grid container spacing={3} className="list-tweets">
      {allTweets.map((tweet, index) => (
        <Grid key={index} item xs={4}>
          <Tweet tweet={tweet} index={index} deleteTweet={deleteTweet} />
        </Grid>
      ))}
    </Grid>
  );
}
