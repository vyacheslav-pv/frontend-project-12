import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useRef, useEffect } from 'react';

import { selectors as messagesActions } from '../../slices/messagesSlice.js';

const MessagesBox = () => {
  const messages = useSelector(messagesActions.selectAll);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(
    () => {
      scrollToBottom();
    },
    [messages],
  );

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ idMessage }) => idMessage === currentChannelId)
        .map(({ newMessage, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{`${username}: `}</b>
            {filter.clean(newMessage)}
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesBox;
