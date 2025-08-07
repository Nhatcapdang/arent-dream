import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useDiary = () => {
  return useMutation({
    mutationFn: async (page: number) => {
      const response = await axios.get<Diary[]>(
        'https://6892c589c49d24bce8684449.mockapi.io/diary',
        {
          params: {
            page,
            limit: 10,
          },
        }
      );
      return response.data;
    },
  });
};
