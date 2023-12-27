import {
  Dropdown, Button, Nav,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import cn from 'classnames';
import { setCurrentChannelId } from '../../slices/channelsSlice.js';

const Channel = ({
  channel, showModal, activeChannelId, currentChannelRef,
}) => {
  const { id, name, removable } = channel;
  const { t } = useTranslation();

  const buttonsStyle = (isCurrent) => cn(
    'w-100 rounded-0 text-start btn',
    { 'btn-secondary': isCurrent },
  );
  const dispatch = useDispatch();

  const isCurrent = id === activeChannelId;

  const filterchannelName = filter.clean(name);

  return (
    removable ? (
      <Nav.Item className="w-100" ref={currentChannelRef} key={id}>
        <Dropdown role="group" className="d-flex dropdown btn-group">
          <Button
            onClick={() => dispatch(setCurrentChannelId(id))}
            type="button"
            variant="white"
            id="channel-button-left"
            className={`w-100 rounded-0 text-start text-truncate btn ${
              activeChannelId === id ? 'btn-secondary' : ''
            }`}
          >
            <span className="me-1">#</span>
            {filterchannelName}
          </Button>
          <Dropdown.Toggle
            split
            type="button"
            variant="white"
            id="channel-button-right"
            className={`flex-grow-0 btn ${activeChannelId === id ? 'btn-secondary' : ''}`}
          >
            <span className="visually-hidden">{t('chat.channel.visuallHidden')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('chat.channel.dropdownDel')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('chat.channel.dropdownRename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    ) : (
      <Nav.Item className="w-100" ref={currentChannelRef} key={id}>
        <Button
          onClick={() => dispatch(setCurrentChannelId(id))}
          type="button"
          variant="white"
          id="channel-button"
          className={buttonsStyle(isCurrent)}
        >
          <span className="me-1">#</span>
          {filterchannelName}
        </Button>
      </Nav.Item>
    )
  );
};

export default Channel;
