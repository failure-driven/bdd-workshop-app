import React from 'react';
import { shallow } from 'enzyme';
import Profile from '.';
import API from '../API';

describe('Profile', () => {
  it('renders correctly in loading state', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles invalid player being set', () => {
    localStorage.setItem('player', undefined);
    API.createUserProfile = () =>
      Promise.resolve({
        response: { profile: 'the-id' },
      });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().userProfilePromise.then(() => {
      // TODO currently rendering spinner
      expect(wrapper).toMatchSnapshot();
      // TODO test for the-id to be output
      // TODO test the id has been set to localstorage
    });
  });

  it('renders profile as returned from fetch the-id', () => {
    localStorage.setItem('player', JSON.stringify({ id: 'the-id' }));
    API.fetchUserProfile = id =>
      Promise.resolve({
        response: { profile: id },
      });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().userProfilePromise.then(() => {
      // TODO currently rendering spinner
      expect(wrapper).toMatchSnapshot();
      // TODO test for the-id to be output
    });
  });

  it('renders profile as created as no player found', () => {
    localStorage.setItem('player', null);
    API.createUserProfile = id =>
      Promise.resolve({
        response: { profile: id },
      });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().userProfilePromise.then(() => {
      // TODO currently rendering spinner
      expect(wrapper).toMatchSnapshot();
      // TODO test for the-id to be output
    });
  });

  // TODO: sort out what should be displayed when the profile fetch fails
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders an error if profile fetch fails from localstorage the-id', () => {
    localStorage.setItem('player', JSON.stringify({ id: 'the-id' }));
    API.fetchUserProfile = id =>
      Promise.reject({
        response: {
          status: 500,
          statusText: `catastrophic failure in fetch ${id}`,
        },
      });
    // TODO should it not go onto createUserProfile?
    // API.createUserProfile = () =>
    //   Promise.reject({
    //     response: { status: 500, statusText: 'catastrophic failure in create' },
    //   });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().userProfilePromise.then(() => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.alert').prop('errorMessage')).toEqual(
        '500 - catastrophic failure in fetch the-id'
      );
    });
  });
});
