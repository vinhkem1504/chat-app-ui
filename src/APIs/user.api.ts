import {axiosInstanceOptions, createAxiosInstance} from '../axios-instance';
import {API_URL} from '../config/chat.config';

export const getUserInfomation = async () => {
  try {
    const options: axiosInstanceOptions = {
      baseURL: `${API_URL}/user`,
    };
    const instance = createAxiosInstance(options);
    const res = await instance.get('/');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
