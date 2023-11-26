import axios from 'axios';





export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {

  const key = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': key ,
    },
  });
    
  return data;
}
