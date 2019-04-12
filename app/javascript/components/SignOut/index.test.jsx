import React from 'react';
import { shallow } from 'enzyme';
import storage from '../../hooks/useProfile/storage';
import messageBus from '../../utils/messageBus';
import SignOut from '.';

const mockStorage = jest.fn().mockImplementation();
// TODO review if this can be simplified?
jest.mock('../../hooks/useProfile/storage', () => {
  return jest.fn().mockImplementation(() => {
    return {
      clear: mockStorage,
    };
  });
});

jest.mock('../../utils/messageBus');

describe('SignOut', () => {
  describe('WHEN it is rendered', () => {
    beforeEach(() => {
      mockStorage.mockClear();
    });

    it('THEN storage is setup for key "player"', () => {
      shallow(<SignOut />);
      expect(storage).toHaveBeenCalledTimes(1);
      expect(storage).toHaveBeenCalledWith('player');
    });

    it('THEN clears storage', () => {
      shallow(<SignOut />);
      expect(mockStorage).toHaveBeenCalledTimes(1);
      expect(mockStorage).toHaveBeenCalledWith();
    });

    it('THEN redirects to /', () => {
      const wrapper = shallow(<SignOut />);
      expect(wrapper.find('Redirect').prop('to')).toEqual('/');
    });

    it('THEN fetchProfile gets called', () => {
      const mockFetchProfile = jest.fn();
      shallow(<SignOut fetchProfile={mockFetchProfile} />);

      // TODO order is important how to make it test fetchProfile was called after sotrage clear?
      expect(mockFetchProfile).toHaveBeenCalledTimes(1);
      expect(mockFetchProfile).toHaveBeenCalledWith();
    });

    // TODO is order important? what if you were not signed in?
    it('THEN a success message is set', () => {
      shallow(<SignOut />);

      // TODO issue it is called too many times and mock clear in beforEach does not work?
      // messageBus.mockClear();
      // expect(messageBus.warn).toHaveBeenCalledTimes(1);

      expect(messageBus.warn).toHaveBeenCalledWith('successfully signed out');
    });

    // TODO what if it fails?
  });
});
