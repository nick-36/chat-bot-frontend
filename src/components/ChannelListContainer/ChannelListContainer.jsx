import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { TeamChannelList, TeamChannelPreview } from "../";
import "./ChannelListContainer.scss";

function ChannelListContainer(props) {
  const { client } = useChatContext();
  const customTeamFilterFn = (channels) => {
    return channels.filter((channel) => channel.type === "team");
  };
  const customMessageFilterFn = (channels) => {
    return channels.filter((channel) => channel.type === "messaging");
  };

  const filters = {
    members: {
      $in: [client?.user?.id],
    },
  };
  return (
    <div className="channelListContainer">
      <ChannelList
        filters={filters}
        channelRenderFilterFn={customTeamFilterFn}
        List={(listprops) => <TeamChannelList {...listprops} type="team" />}
        Preview={(previewprops) => (
          <TeamChannelPreview {...previewprops} type="team" />
        )}
      />
      <ChannelList
        filters={filters}
        channelRenderFilterFn={customMessageFilterFn}
        List={(listprops) => (
          <TeamChannelList {...listprops} type="messaging" />
        )}
        Preview={(previewprops) => (
          <TeamChannelPreview {...previewprops} type="messaging" />
        )}
      />
    </div>
  );
}

export default ChannelListContainer;
