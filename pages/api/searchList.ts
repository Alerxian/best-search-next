import { fetchApi } from '.';

export interface SearchParams {
  login_token?: string;
  search_phrase: string;
}

export interface SearchList {
  name: string;
  search_msv: { date: string; sv: number }[];
}

export type SearchLists = SearchList[];

export interface SearchListRes {
  product_trends: SearchLists;
}

export function getSearchList(params: SearchParams) {
  return fetchApi('/interview/keyword_search', {
    method: 'POST',
    body: JSON.stringify({ login_token: 'INTERVIEW_SIMPLY2021', ...params }),
  });
}
