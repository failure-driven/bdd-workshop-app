import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import ProfileContainer from './ProfileContainer';
import ProfileSteps from '../Profile/ProfileSteps';
import ShowProfile from '../Profile/ShowProfile';

jest.mock('../../utils/messageBus');

describe('ProfileContainer', () => {
  it('THEN it redirects if no profile is passed', () => {
    const wrapper = shallow(<ProfileContainer history={{ push: jest.fn() }} />);
    expect(wrapper.type()).toBe(Redirect);
  });

  describe('WHEN a profile is NOT 100% complete', () => {
    it('THEN it renders ProfileSteps', () => {
      const wrapper = shallow(
        <ProfileContainer
          profile={{ id: 'the-id', percentComplete: 33 }}
          history={{ push: jest.fn() }}
        />
      );

      expect(wrapper.childAt(0).type()).toEqual(ProfileSteps);
    });
  });

  describe('WHEN a profile is 100% complete', () => {
    it('THEN it renders ?', () => {
      const wrapper = shallow(
        <ProfileContainer
          profile={{ id: 'the-id', percentComplete: 100 }}
          history={{ push: jest.fn() }}
        />
      );

      expect(wrapper.childAt(0).type()).toEqual(ShowProfile);
    });
  });
});
