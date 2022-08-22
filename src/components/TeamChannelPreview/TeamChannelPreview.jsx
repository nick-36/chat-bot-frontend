import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, useChatContext } from "stream-chat-react";
import { SET_CREATING, SET_EDITING } from "../../Store/ChannelSlice";
import "./TeamChannelPreview.scss";
const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client, setActiveChannel } = useChatContext();

  const dispatch = useDispatch();

  const handlePreview = () => {
    dispatch(SET_CREATING(false));
    dispatch(SET_EDITING(false));

    setActiveChannel(channel);
  };

  const ChannelPreview = () => {
    return (
      <p
        className={
          channel?.id === activeChannel?.id
            ? "channel__preview__item selected"
            : "channel__preview__item"
        }
      >
        #{channel?.data?.name ? channel?.data?.name : channel?.data?.id}
      </p>
    );
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.user.id
    );

    return (
      <div
        className={
          channel?.id === activeChannel?.id
            ? "channel__preview__item selected"
            : "channel__preview__item"
        }
      >
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.name}
          size={24}
        />
        <p>{members[0]?.user?.name}</p>
      </div>
    );
  };
  return (
    <div className="channel__preview" onClick={handlePreview}>
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
