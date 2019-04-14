/* eslint-disable no-unused-vars */
const API_DATA = [
  { text: 'Selena Gomez', id: 1 },
  { text: 'Ariel', id: 2 },
  { text: 'Selena', id: 3 },
  { text: 'Belle', id: 4 },
  { text: 'Jasmine', id: 5 },
  { text: 'Pocahontas', id: 6 },
  { text: 'Cinderella', id: 7 },
  { text: 'Snow White', id: 8 },
  { text: 'Fa Mulan', id: 9 },
  { text: 'Merida', id: 10 },
];

const FakeApi = ({ latency }) => ({
  get: id =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: API_DATA[id] });
      }, latency || 30);
    }),
});

export default FakeApi;
