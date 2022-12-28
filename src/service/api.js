import axios from 'axios';

export const getImages = async (query, page) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31519936-a40efe08f879d78a0873eff0f',
      q: query,
      page: page,
      orientation: 'horizontal',
      per_page: 20,
    },
  });
  return data;
};
