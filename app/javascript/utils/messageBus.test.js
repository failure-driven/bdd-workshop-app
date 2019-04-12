import messageBus from './messageBus';

describe('messageBus', () => {
  let notifications = [];

  messageBus.subscribe(message => {
    notifications.push(message);
  });

  beforeEach(() => {
    notifications = [];
  });

  it('sends info message on info', () => {
    messageBus.info('an info message');

    expect(notifications).toEqual([
      { status: 'info', content: 'an info message' },
    ]);
  });

  it('sends warn message on warning', () => {
    messageBus.warn('a warn message');

    expect(notifications).toEqual([
      { status: 'warning', content: 'a warn message' },
    ]);
  });

  it('sends error message on error', () => {
    messageBus.error('an error message');

    expect(notifications).toEqual([
      { status: 'error', content: 'an error message' },
    ]);
  });
});
