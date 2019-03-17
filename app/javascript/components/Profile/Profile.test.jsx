import React from 'react';
import { shallow } from 'enzyme';
import Profile from '.';
import API from '../API';
import { Alert } from 'reactstrap';

const childrenText = element =>
  element
    .children()
    .map(child => child.text())
    .join('');

describe('Profile', () => {
  it('renders correctly in loading state', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders profile as returned from fetch', () => {
    API.fetchUserProfile = () =>
      Promise.resolve({
        response: { profile: 'data' },
      });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().fetchUserProfilePromise.then(() => {
      expect(wrapper).toMatchSnapshot();
      expect(childrenText(wrapper.find(Alert))).toEqual('');
    });
  });

  it('renders an error if profile fetch fails', () => {
    API.fetchUserProfile = () =>
      Promise.reject({
        response: { status: 500, statusText: 'catastrophic failure' },
      });

    const wrapper = shallow(<Profile />);

    return wrapper.instance().fetchUserProfilePromise.then(() => {
      expect(wrapper).toMatchSnapshot();
      expect(childrenText(wrapper.find(Alert))).toEqual(
        'Something went wrong - 500 - catastrophic failure'
      );
    });
  });
});
