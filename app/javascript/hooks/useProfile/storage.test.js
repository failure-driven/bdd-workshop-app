import storage from './storage';

describe('storage', () => {
  beforeEach(() => localStorage.removeItem('the-key'));

  it('storage returns undefiend by default', () => {
    const emptyStorage = storage();
    expect(emptyStorage.get()).toBe(null);
  });

  it('storage returns json parsed content of localstorage for a given key', () => {
    localStorage.setItem('the-key', '{"the":"content"}');
    const theKeyStorage = storage('the-key');
    expect(theKeyStorage.get()).toEqual({ the: 'content' });
  });

  it('storage returns undefined if it cannot parse the json for content localstorage for a given key', () => {
    localStorage.setItem('the-key', '{the"not valid json"}');
    const theKeyStorage = storage('the-key');
    expect(theKeyStorage.get()).toBe(null);
  });

  it('localStorage gets reset if it was invalid', () => {
    localStorage.setItem('the-key', '{the"not valid json"}');
    storage('the-key').get();
    expect(localStorage.getItem('the-key')).toBe(null);
  });

  it('allows a new value to be stored', () => {
    const theKeyStorage = storage('the-key');
    expect(theKeyStorage.get()).toBe(null);
    theKeyStorage.set({ id: 'abc-123' });
    expect(theKeyStorage.get()).toEqual({ id: 'abc-123' });
    theKeyStorage.set({ id: 'XYZ-789' });
    expect(theKeyStorage.get()).toEqual({ id: 'XYZ-789' });
    theKeyStorage.set(null);
    expect(theKeyStorage.get()).toBe(null);
  });

  it('returns the set value if successfully set', () => {
    const theKeyStorage = storage('the-key');
    expect(theKeyStorage.set({ id: 'abc-123' })).toEqual({ id: 'abc-123' });
  });

  it("won't allow an invalid json value to be set", () => {
    const theKeyStorage = storage('the-key');
    expect(theKeyStorage.get()).toBe(null);
    theKeyStorage.set(); // TODO what is a value that would make JSON.stringify() crash?
    expect(theKeyStorage.get()).toBe(null);
  });
});
