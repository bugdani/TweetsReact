import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ModalContainer from "../ModalContainer";
import FormSendTweet from "../FormSendTweet";
import Moment from "moment";
import { TWEETS_STORAGE } from "../../utils/constant";

import "./SendTweet.scss";

export default function SendTweet(props) {
  const { setToastProps, allTweets } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const enviarTweet = (event, formValue) => {
    event.preventDefault();
    const { name, tweet } = formValue;
    let allTweetsArray = [];

    if (allTweets) {
      allTweetsArray = allTweets;
    }

    if (!name || !tweet) {
      setToastProps({
        open: true,
        text: "Debe estar completo el campo",
        severity: "error",
      });
    } else {
      formValue.time = Moment();
      allTweetsArray.push(formValue);
      localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
      setToastProps({
        open: true,
        text: "Tweet guardado!",
        severity: "success",
      });
    }
    allTweetsArray = [];
  };

  return (
    <div className="send-tweet">
      <Fab
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
      <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
        <FormSendTweet enviarTweet={enviarTweet} />
      </ModalContainer>
    </div>
  );
}
