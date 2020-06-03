import React, { useState, useEffect } from "react";
import { Container, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Header from "./components/Header";
import SendTweet from "./components/SendTweet";
import { TWEETS_STORAGE } from "./utils/constant";
import ListTweets from "./components/ListTweets";

function App() {
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null,
    severity: null,
  });

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setToastProps(false);
  }

  const [allTweets, setAllTweets] = useState([]);
  const [reloadTweets, setReloadTweets] = useState(false);

  useEffect(() => {
    const allTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const allTweetsArray = JSON.parse(allTweetsStorage);
    setAllTweets(allTweetsArray);
    setReloadTweets(false);
  }, [reloadTweets]);

  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweets(true);
  };

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header />
      <SendTweet setToastProps={setToastProps} allTweets={allTweets} />
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet} />
      <Snackbar
        open={toastProps.open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason)}
      >
        <Alert severity={toastProps.severity}>
          {<span>{toastProps.text}</span>}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
