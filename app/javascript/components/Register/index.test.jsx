import React from 'react';
import { shallow } from 'enzyme';
import Register from '.';
import OurForm from '../OurForm';
import { createUserProfile } from '../API';

jest.mock('../API');

describe('Register', () => {
  it('renders text and a OurForm', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
  });

  it('will call the onSubmit method, WHEN the OurForm is submitted', () => {
    createUserProfile.mockResolvedValue({});
    const wrapper = shallow(<Register />);
    wrapper.find(OurForm).prop('onSubmit')({ data: { handle: 'the-handle' } });
    expect(createUserProfile).toHaveBeenCalledTimes(1);
    expect(createUserProfile).toHaveBeenCalledWith({
      data: { handle: 'the-handle' },
    });
  });
});
