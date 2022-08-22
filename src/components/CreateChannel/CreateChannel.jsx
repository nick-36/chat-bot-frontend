import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChatContext } from "stream-chat-react";
import { UsersList } from "../";
import { SET_CREATING, SET_EDITING } from "../../Store/ChannelSlice";
import "./CreateChannel.scss";

const ChannelNameInput = ({ channelName, setChannelName }) => {
  const onChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };
  return (
    <>
      <form className="channel__form">
        <div className="channel__form__group">
          <label htmlFor="channelName" className="channel__form__label">
            Name
          </label>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={onChange}
            placeholder="Name"
            className="channel__form__input"
          />
        </div>
      </form>
      <div className="channel__add__members">
        <h2 className="title">Add Members</h2>
        <div className="line"></div>
      </div>
    </>
  );
};

function CreateChannel(props) {
  const [channelName, setChannelName] = useState("");
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.user.id || ""]);
  const { createType } = useSelector((state) => state.channelReducer);
  const dispatch = useDispatch();

  const handleCreateChannel = async () => {
    try {
      const newChannel = await client.channel(createType, channelName, {
        members: selectedUsers,
        name: channelName,
      });
      await newChannel.watch();
      setChannelName("");
      dispatch(SET_CREATING(false));
      setSelectedUsers([client.user.id]);
      setActiveChannel(newChannel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="channel__create">
      <div className="channel__create__header">
        <h2 className="title channel__title">
          <p>
            {createType === "team"
              ? "Create a New Channel"
              : "Send a Direct Message"}
          </p>
          <FontAwesomeIcon
            icon={faTimes}
            className="icon-close"
            onClick={() => {
              dispatch(SET_EDITING(false));
              dispatch(SET_CREATING(false));
            }}
          />
        </h2>
        <div className="line"></div>
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}

      <UsersList setSelectedUsers={setSelectedUsers} />
      <div className="channel__create__btn">
        <button className="btn btn-create " onClick={handleCreateChannel}>
          {createType === "team" ? "Create Channel" : "Add Contact "}
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;
