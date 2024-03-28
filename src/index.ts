import Pagination from './ts/pagination';
import ItemList from './ts/itemList';
import { movie } from './ts/item';
import axios, { AxiosResponse } from 'axios';

interface fetchDataCinema {
  page: number;
  results: movie[];
  total_pages: number;
  total_results: number;
}

async function fetchData(pageIndex: number): Promise<any> {
  const dataMovies: AxiosResponse<any> = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&sort_by=popularity.desc`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
        accept: 'application/json',
      },
    }
  );

  return dataMovies;
}

export default class GetMovieList {
  pageIndex: number;
  constructor() {
    this.pageIndex = 1;
  }
  showItem(data: movie[]): void {
    const cinemaList: HTMLElement = document.querySelector('.cinema-list');
    const movies = new ItemList(data);
    cinemaList.append(movies.element);
  }

  showPage(data: fetchDataCinema): void {
    const list: HTMLElement = document.querySelector('.pagination-list');
    const pagination = new Pagination(data);
    fetchData(1).then(data => console.log(data));
    list.append(...Array.from(pagination.element.children));
    // list.addEventListener('page-changed', evt => {
    //   const page = evt as Event;
    //   console.log(page);
    // });
  }
}
