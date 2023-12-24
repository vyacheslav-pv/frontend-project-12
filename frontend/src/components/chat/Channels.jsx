import { Col, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { setModalInfo } from '../../slices/modalsSlice';
import ModalDialog from '../modals/ModalDialog.jsx';
import Channel from './Channel';

const Channels = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();
  console.log(currentChannelId);

  const currentChannelRef = useRef(null);

  const dispatch = useDispatch();

  const showModal = (type, channel = null) => {
    dispatch(setModalInfo({ type, channel }));
  };

  const channels = useSelector(channelsSelectors.selectAll);
  console.log(channels);

  const scrollToCurrentChannel = () => {
    currentChannelRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToCurrentChannel();
  }, [channels]);

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels.channels')}</b>
        <Button variant="group-vertical" className="p-0 text-primary" type="button" onClick={() => showModal('adding')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav id="channels-box" variant="pills" fill className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            activeChannelId={currentChannelId}
            showModal={showModal}
            currentChannelRef={(channel.id === currentChannelId) ? currentChannelRef : null}
          />
        ))}
      </Nav>
      <ModalDialog />
    </Col>
  );
};

export default Channels;
