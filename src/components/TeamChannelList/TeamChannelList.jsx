import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_CREATETYPE, SET_CREATING } from "../../Store/ChannelSlice";

import "./TeamChannelList.scss";
const TeamChannelList = ({ children, error = false, loading, type }) => {
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    dispatch(SET_CREATETYPE(type));
    dispatch(SET_CREATING(true));
  };
  if (error) {
    return type === "team" ? (
      <div className="team__channel__list">
        <div className="message">
          <p className="text">
            Error connecting to chat, refresh the page to try again.
          </p>
        </div>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div className="team__channel__list">
        <div className="message">
          <p className="text">
            {type === "team" ? "Channels" : "Messages"} loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="team__channel__list">
      <div className="header">
        <h6 className="title">
          {type === "team" ? "Channels" : "Direct-Messages"}
        </h6>
        <FontAwesomeIcon
          icon={faPlus}
          className="icon-add"
          onClick={handleAddChannel}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
