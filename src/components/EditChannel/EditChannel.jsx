import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useChatContext } from "stream-chat-react";
import { UsersList } from "../";
import { SET_CREATING, SET_EDITING } from "../../Store/ChannelSlice";
import "./EditChannel.scss";

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
            placeholder={channelName}
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

function EditChannel(props) {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

  const handleUpdateChannel = async (e) => {
    e.preventDefault();

    const isNameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);

    if (isNameChanged) {
      await channel.update(
        {
          name: channelName,
        },
        {
          text: `Channel name changed to ${channelName}`,
        }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    dispatch(SET_EDITING(false));
    setSelectedUsers([]);
  };
  return (
    <div className="edit__channel">
      <div className="edit__channel__header">
        <h2 className="edit__channel__title">
          <p>Edit Channel</p>
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
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UsersList setSelectedUsers={setSelectedUsers} />
      <div className="edit__channel__btn">
        <button className="btn btn-save " onClick={handleUpdateChannel}>
          Save Channel
        </button>
      </div>
    </div>
  );
}

export default EditChannel;
