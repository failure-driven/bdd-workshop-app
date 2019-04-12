import EventEmitter from 'events';

const messages = new EventEmitter();

const subscribe = handler => {
  messages.on('message', handler);
};

const notify = (status, content) => {
  messages.emit('message', { status, content });
};

const info = content => {
  notify('info', content);
};
const warn = content => {
  notify('warning', content);
};
const error = content => {
  notify('error', content);
};

export default {
  subscribe,
  info,
  warn,
  error,
};
