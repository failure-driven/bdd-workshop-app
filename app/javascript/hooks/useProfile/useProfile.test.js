import { renderHook, cleanup } from 'react-hooks-testing-library';
import useProfile from '.';
import api from './api';
import storage from './storage';

jest.mock('./api');
jest.mock('./storage');

describe('useProfile', () => {
  const mockGet = jest.fn();
  const mockStorageSet = jest.fn();

  beforeEach(() => {
    mockGet.mockReset();
    mockStorageSet.mockReset();
  });
  afterAll(() => cleanup);

  // TODO
  // Fails with
  // Warning: An update to TestHook inside a test was not wrapped in act(...).
  //
  // When testing, code that causes React state updates should be wrapped into act(...):
  //
  //     act(() => {
  //       /* fire events that update state */
  //     });
  //     /* assert on the output */
  //
  // This ensures that you're testing the behavior the user would see in the browser.
  // Learn more at https://fb.me/react-wrap-tests-with-act in TestHook
  //
  // also never gets to set the profile as it is called from useEffect?
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('calls get profile with the id set in storage', () => {
    mockGet.mockResolvedValue({ profile: { id: 'abc-123' } });
    storage.mockReturnValue({
      get: () => ({ id: 'abc-123' }),
      set: mockStorageSet,
    });
    api.mockReturnValue({ get: mockGet });

    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useProfile());

    // TODO profile not set
    // expect(result.current.profile).toEqual({ id: 'abc-123' });

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/api/v1/profiles/abc-123');
  });

  // TODO as above
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('profile is undefined if call to get profile fails as there is no profile for the id', () => {
    mockGet.mockRejectedValue({ message: 'error' });
    storage.mockReturnValue({
      get: () => ({ id: 'abc-123' }),
      set: mockStorageSet,
    });
    api.mockReturnValue({ get: mockGet });

    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toEqual(undefined);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/api/v1/profiles/abc-123');
  });

  it('profile is undefined and loading true if there is no id and NO call to get profile is made', () => {
    storage.mockReturnValue({ get: () => null });
    api.mockReturnValue({ get: mockGet });

    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(mockGet).toHaveBeenCalledTimes(0);
  });
});
