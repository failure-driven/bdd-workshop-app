import axios from 'axios';
import { fetchUserProfile, createUserProfile } from './';

describe('createUserProfile', () => {
  it('should post to create a new player profile', () => {
    const axiosPosts = [];

    axios.post = (url, data, { headers }) => {
      axiosPosts.push({ url, data, headers });
      return new Promise(() => {});
    };

    createUserProfile({ handle: 'the-handle' });

    expect(axiosPosts).toEqual([
      {
        url: '/api/v1/profiles',
        data: { player: { handle: 'the-handle' } },
        headers: { Accept: 'application/json' },
      },
    ]);
  });
});

describe('fetchUserProfile', () => {
  it('should request profile', () => {
    const axiosGets = [];

    axios.get = (url, { headers }) => {
      axiosGets.push({ url, headers });
      return new Promise(() => {});
    };

    fetchUserProfile('profile-id');

    expect(axiosGets).toEqual([
      {
        url: '/api/v1/profiles/profile-id',
        headers: { Accept: 'application/json' },
      },
    ]);
  });

  it('should return data from response', async () => {
    axios.get = () => {};
    axios.get = () => Promise.resolve('the data');

    const response = await fetchUserProfile('token');
    expect(response).toEqual('the data');
  });

  it('should attempt to create if the fetch fails', async () => {
    const expectedError = new Error('oh no');
    axios.get = () => Promise.reject(expectedError);

    const axiosPosts = [];

    axios.post = (url, { headers }) => {
      axiosPosts.push({ url, headers });
      return new Promise(() => {});
    };

    // TODO sort this out
    // const response = await fetchUserProfile('profile-id')
    //   .then(() => {
    //     expect('no error').toEqual('unhandled error');
    //   })
    //   .catch(actualError => {
    //     expect(actualError).toEqual(expectedError);
    //   });
    // expect(response).toEqual('the data');

    // expect(axiosPosts).toEqual([
    //   {
    //     url: '/api/v1/profiles.json',
    //     headers: { 'Content-Type': 'application/json' },
    //   },
    // ]);
  });
});
