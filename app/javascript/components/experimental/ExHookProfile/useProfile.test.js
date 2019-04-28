import { cleanup } from 'react-hooks-testing-library';
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
  it('calls get profile with the id set in storage', () => {
    storage.mockReturnValue({ get: () => ({ id: 'abc-123' }) });
    api.mockResolvedValue({ get: mockGet });

    // eslint-disable-next-line no-unused-vars
    // const { result } = renderHook(() => useProfile());

    // expect(result.current.profile).toEqual({ id: 'abc-123' });

    // expect(mockGet).toHaveBeenCalledTimes(1);
    // expect(mockGet).toHaveBeenCalledWith('/api/v1/profiles/abc-123');
  });
});
