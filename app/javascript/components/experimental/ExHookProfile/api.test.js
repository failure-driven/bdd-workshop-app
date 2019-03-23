import api from './api';
import axios from 'axios';

jest.mock('axios');

describe('useProfile', () => {
  beforeEach(() => {
    axios.create.mockReset();
  });
  it('api is created with default headers', () => {
    axios.create.mockReturnValue({});
    api();
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
    });
  });
});
