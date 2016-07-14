import cx from 'classnames';
import * as React from 'react';
import { DragSource } from 'react-dnd';
import DragIcon from 'material-ui/svg-icons/editor/drag-handle';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';

import { WAITLIST_USER } from '../../constants/DDItemTypes';

import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

const userSource = {
  beginDrag(props) {
    return { user: props.user };
  },
  endDrag(props, monitor) {
    const result = monitor.getDropResult();
    const item = monitor.getItem();
    if (item.user && result) {
      props.onMoveUser(result.position);
    }
  }
};

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
});

/**
 * A Draggable waitlist user row with moderation tools.
 */
const ModRowBase = ({
  className,
  position,
  user,
  connectDragPreview,
  connectDragSource,
  onRemoveUser
}) => connectDragPreview(
  <div className={cx('UserRow', 'UserRow--queue', className)}>
    <Position position={position + 1} />
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username className="UserRow-username" user={user} />
    <div className="UserRow-tools">
      {connectDragSource(
        <div className="UserRow-tool UserRow-handle">
          <DragIcon />
        </div>
      )}
      <div
        className="UserRow-tool UserRow-remove"
        onClick={onRemoveUser}
      >
        <RemoveIcon />
      </div>
    </div>
  </div>
);

ModRowBase.propTypes = {
  className: React.PropTypes.string,
  position: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired,
  connectDragPreview: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  onMoveUser: React.PropTypes.func.isRequired,
  onRemoveUser: React.PropTypes.func.isRequired
};

export default DragSource(WAITLIST_USER, userSource, collect)(ModRowBase);