import { SearchListRes } from './searchList';

const StaticUrl = 'http://3.141.23.218:5000';

export interface Res<T> {
  status: string;
  msg: string;
  data: T;
}

export const fetchApi = (
  api: string,
  requestParam?: any
): Promise<Res<SearchListRes>> => {
  return fetch(StaticUrl + api, {
    ...requestParam,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log('ERROR: ', err);
    });
};
