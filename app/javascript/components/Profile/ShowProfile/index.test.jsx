import React from 'react';
import { shallow } from 'enzyme';
import ShowProfile from '.';

describe('ShowProfile', () => {
  it('Displays avatar, name, handle and email', () => {
    const wrapper = shallow(
      <ShowProfile
        profile={{
          id: 'the-id',
          handle: 'the-handle',
          name: 'the-name',
          email: 'user@email.com',
        }}
      />
    );

    expect(mapDdToDtElements(wrapper)).toEqual({
      handle: 'the-handle',
      name: 'the-name',
      email: 'user@email.com',
      avatar: '',
    });
  });
});

Object.fromEntries = arr =>
  Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));

const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

const text = e => e.text();

const mapDdToDtElements = wrapper =>
  Object.fromEntries(
    zip(wrapper.find('dt').map(text), wrapper.find('dd').map(text))
  );
