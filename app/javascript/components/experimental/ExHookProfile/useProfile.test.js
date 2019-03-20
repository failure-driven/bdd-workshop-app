import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import useProfile from './useProfile';

describe('useProfile', () => {
  afterEach(cleanup);

  it('setProfile changes profile to "hello"', () => {
    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toEqual(undefined);

    act(() => result.current.setProfile('hello'));

    expect(result.current.profile).toEqual('hello');
  });
});
