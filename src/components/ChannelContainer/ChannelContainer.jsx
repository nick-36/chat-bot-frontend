import React from "react";
import { useSelector } from "react-redux";
import { Channel, MessageTeam } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel } from "../";
import "./ChannelContainer.scss";

function ChannelContainer(props) {
  const { isCreating, isEditing } = useSelector(
    (state) => state.channelReducer
  );

  if (isCreating) {
    return (
      <div className="channel__wrapper">
        <CreateChannel />
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__wrapper">
        <EditChannel />
      </div>
    );
  }

  const EmptyState = () => {
    return (
      <div className="channel__empty__container">
        <p className="channel__empty__text">
          This is the begning of your chat history Send messages,emojis and
          more!
        </p>
      </div>
    );
  };

  return (
    <div className="channel__wrapper">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
