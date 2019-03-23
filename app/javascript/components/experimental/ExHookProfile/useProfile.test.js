import { renderHook, cleanup } from 'react-hooks-testing-library';
import useProfile from './useProfile';
import api from '../../../hooks/useProfile/api';
import storage from '../../../hooks/useProfile/storage';

jest.mock('../../../hooks/useProfile/api');
jest.mock('../../../hooks/useProfile/storage');

describe('useProfile', () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    cleanup();
    mockGet.mockReset();
    mockPost.mockReset();
  });

  // TODO
  // Fails if there is an api().post().then() in createProfile
  //    TypeError: Cannot read property 'then' of undefined
  //
  // also never gets to set the profile as it is called from useEffect?
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('calls get profile with the id set in storage', () => {
    storage.mockReturnValue({ get: () => ({ id: 'abc-123' }) });
    api.mockReturnValue({ get: mockGet });

    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useProfile());

    // expect(result.current.profile).toEqual({ id: 'abc-123' });

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/api/v1/profiles/abc-123');
  });

  // TODO same as above
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('calls create profile if there is no profile in storage', () => {
    storage.mockReturnValue({ get: () => null });
    api.mockReturnValue({ post: mockPost });

    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useProfile());

    // expect(result.current.profile).toEqual({ id: 'abc-123' });

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('/api/v1/profiles');
  });

  // TODO similar to above but with catch statement
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('calls create profile if get profile fails', () => {
    storage.mockReturnValue({ get: () => ({ id: 'abc-123' }) });
    // mockGet.mockRejectedValue({});
    const mockCatch = jest.fn();
    const mockReject = () => ({ catch: mockCatch });
    mockGet.mockReturnValue(mockReject);
    api.mockReturnValue({ get: mockGet, post: mockPost });

    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useProfile());

    // expect(result.current.profile).toEqual({ id: 'abc-123' });
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/api/v1/profiles/abc-123');
    expect(mockCatch).toHaveBeenCalledTimes(1);
    // expect(mockPost).toHaveBeenCalledTimes(1);
    // expect(mockPost).toHaveBeenCalledWith('/api/v1/profiles');
  });
});
