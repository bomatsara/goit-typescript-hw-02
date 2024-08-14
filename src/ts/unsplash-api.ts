import axios, { AxiosResponse } from 'axios';
import { PhotoType } from './types';

const credentials = {
  applicationsId: 629723,
  accessKey: 'NlolqDG36t30fAlIGSLIRe_2hRRKzp5STeOT303vNqo',
  secretKey: 'Uwj0HQadMlAQKRg_EJm-_aKVDC81yJoB0Nc0CnW-scI',
};

axios.defaults.baseURL = 'https://api.unsplash.com';

interface UnsplashResponseData {
  total: number;
  total_pages: number;
  results: PhotoType[];
}

interface UnsplashResponse extends AxiosResponse {
  data: UnsplashResponseData;
  status: number;
  statusText: string;
}

export default async function getPhotos(query: string, page: number): Promise<UnsplashResponse> {
  return await axios.get<UnsplashResponseData>('/search/photos', {
    headers: {
      Authorization: `Client-ID ${credentials.accessKey}`,
    },
    params: {
      query: query,
      per_page: 12,
      page: page,
    },
  });
}