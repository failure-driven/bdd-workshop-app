import React from 'react';
import {shallow} from 'enzyme';
import Register from '.';
import HandleForm from '../HandleForm';
import {createUserProfile} from '../API'

jest.mock('../API');

describe('Register', () => {
  it('renders text and a form', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper).toMatchSnapshot()
  })

  it('will call the onSubmit method, WHEN the form is submitted', () => {
    createUserProfile.mockResolvedValue({})
    const wrapper = shallow(<Register/>);
    wrapper.find(HandleForm).prop('onSubmit')({data: {handle: 'the-handle'}})
    expect(createUserProfile).toHaveBeenCalledTimes(1)
    expect(createUserProfile).toHaveBeenCalledWith({data: {handle: 'the-handle'}})
  });
});