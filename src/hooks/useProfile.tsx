import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { D01, D02, L01, L02, L03, M01, M03, S01 } from '@/public/images';
import { ProfileType } from '../constants/enum';

export const useProfile = () => {
  return useMutation({
    mutationFn: async (page: number) => {
      const response = await axios.get<Profile[]>(
        'https://6892c589c49d24bce8684449.mockapi.io/profile',
        {
          params: {
            page,
            limit: 10,
          },
        }
      );
      const data = response.data;
      return data.map((item, idx) => ({
        ...item,
        image: [M01, L03, D01, L01, M03, D02, L02, D02, S01][idx % 8],
        label: Object.values(ProfileType)[idx % 4],
      }));
    },
  });
};
