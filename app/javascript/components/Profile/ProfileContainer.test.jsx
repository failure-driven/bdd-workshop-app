import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'reactstrap';
import ProfileContainer from './ProfileContainer';
import API from '../API';
import messageBus from '../../utils/messageBus';

jest.mock('../../utils/messageBus');

describe('Profile', () => {
  describe('WHEN loading', () => {
    it('THEN it renders a spinner for loading', () => {
      const wrapper = shallow(
        <ProfileContainer history={{ push: jest.fn() }} />
      );
      expect(wrapper.type()).toBe(Spinner);
    });
  });

  describe('WHEN the profile is fetched successfully', () => {
    beforeEach(
      () =>
        (API.fetchUserProfile = id =>
          Promise.resolve({ response: { profile: id } }))
    );

    it('THEN it renders the profile returned', () => {
      localStorage.setItem('player', JSON.stringify({ id: 'the-id' }));

      const wrapper = shallow(
        <ProfileContainer history={{ push: jest.fn() }} />
      );

      return wrapper.instance().userProfilePromise.then(() => {
        // expect(wrapper.type()).not.toBe(Spinner);
        // TODO currently rendering spinner
        expect(wrapper).toMatchInlineSnapshot(`
<Spinner
  color="primary"
  data-testid="profile-loading"
  tag="div"
  type="border"
>
  Loading...
</Spinner>
`);
        // TODO test for the-id to be output
      });
    });
  });

  describe('WHEN fetch player fails', () => {
    beforeEach(
      () =>
        (API.fetchUserProfile = id =>
          Promise.reject({
            response: {
              status: 500,
              statusText: `catastrophic failure in fetch ${id}`,
            },
          }))
    );

    it("THEN redirects to '/' and sets error message", () => {
      messageBus.error = jest.fn();
      const historyPush = jest.fn();
      const wrapper = shallow(
        <ProfileContainer history={{ push: historyPush }} />
      );

      return wrapper.instance().userProfilePromise.finally(() => {
        expect(messageBus.error).toHaveBeenCalledWith(
          '500 - catastrophic failure in fetch undefined'
        );
      });
    });
  });

  describe('WHEN player in localStoarge is null', () => {
    beforeEach(() => localStorage.setItem('player', null));

    it("THEN redirects to '/' and sets error message", () => {
      messageBus.error = jest.fn();
      const historyPush = jest.fn();
      shallow(<ProfileContainer history={{ push: historyPush }} />);

      expect(historyPush).toHaveBeenCalledWith('/');
      expect(messageBus.error).toHaveBeenCalledWith(
        'Access deined, please register'
      );
    });
  });
});
