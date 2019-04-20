/* eslint-disable no-unused-vars */
const API_DATA = [
  {
    imgUrl: '/sample_avatars/bbc_micro_80_80.png',
    text: 'Selena Gomez',
    id: 1,
  },
  {
    imgUrl: '/sample_avatars/bbc_micro_80_80.png',
    text: 'Sophie Wilson',
    id: 2,
  },
  {
    imgUrl: '/sample_avatars/selena_small_gravatar.png',
    text: 'Selena',
    id: 3,
  },
  {
    imgUrl: '/sample_avatars/kathleen_booth.jpg',
    text: 'Kathleen Booth',
    id: 4,
  },
  { imgUrl: '/sample_avatars/grace_hopper.jpg', text: 'Grace Hopper', id: 5 },
  { imgUrl: '/sample_avatars/jean_sammet.png', text: 'Jean Sammet', id: 6 },
  {
    imgUrl: '/sample_avatars/logo_terrapin.png',
    text: 'Cynthia Solomon',
    id: 7,
  },
  {
    imgUrl: '/sample_avatars/barbara_liskov.jpg',
    text: 'Barbara Liskov',
    id: 8,
  },
  {
    imgUrl: '/sample_avatars/adele_goldberg.jpg',
    text: 'Adele Goldberg',
    id: 9,
  },
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
