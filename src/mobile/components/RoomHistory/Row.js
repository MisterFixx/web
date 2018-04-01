import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui-next/Avatar'; // eslint-disable-line
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui-next/List'; // eslint-disable-line
import Votes from './Votes';

const wrapTitle = title => (
  <span className="MobileMediaRow-title">
    {title}
  </span>
);

const HistoryRow = ({ media }) => (
  <ListItem className="MobileMediaRow">
    <ListItemAvatar>
      <Avatar
        src={media.media.thumbnail}
        style={{ borderRadius: 0 }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={wrapTitle(media.media.title)}
      secondary={media.media.artist}
    />
    <Votes {...media.stats} />
  </ListItem>
);

HistoryRow.propTypes = {
  media: PropTypes.object,
};

export default HistoryRow;
