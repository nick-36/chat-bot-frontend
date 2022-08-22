import React from "react";
import { Chat } from "stream-chat-react";
import {
  ChannelContainer,
  ChannelListContainer,
  ChannelSearch,
} from "../../components";

const Home = ({ client }) => {
  return (
    <div className="chat__container">
      <Chat client={client}>
        <ChannelSearch />
        <div className="channel-main__container">
          <ChannelListContainer />
          <ChannelContainer />
        </div>
      </Chat>
    </div>
  );
};

export default Home;
