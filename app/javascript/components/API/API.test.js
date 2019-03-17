import axios from 'axios';
import { fetchUserProfile } from './';

describe('fetchUserProfile', () => {
  it('should request profile', () => {
    const axiosGets = [];

    axios.get = url => {
      axiosGets.push({ url });
      return new Promise(() => {});
    };

    fetchUserProfile();

    expect(axiosGets).toEqual([
      {
        url: '/api/v1/profiles',
      },
    ]);
  });

  it('should return data from response', async () => {
    axios.get = () => {};
    axios.get = () => Promise.resolve({ data: 'the data' });

    const response = await fetchUserProfile('token');
    expect(response).toEqual('the data');
  });

  it('should allow unexpected errors to be caught', async () => {
    axios.get = () => {};
    const expectedError = new Error('oh no');
    axios.get = () => Promise.reject(expectedError);

    return fetchUserProfile('token')
      .then(() => {
        expect('no error').toEqual('unhandled error');
      })
      .catch(actualError => {
        expect(actualError).toEqual(expectedError);
      });
  });
});
