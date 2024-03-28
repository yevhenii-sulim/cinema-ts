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

async function fetchData(pageIndex: number): Promise<fetchDataCinema> {
  const dataMovies: AxiosResponse<fetchDataCinema> = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&sort_by=popularity.desc`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
        accept: 'application/json',
      },
    }
  );
  return dataMovies.data;
}

const list: HTMLElement = document.querySelector('.pagination-container');
const cinemaList: HTMLElement = document.querySelector('.cinema-list');
async function initExempl(): Promise<void> {
  const dataMovies: fetchDataCinema = await fetchData(1);
  showItem(dataMovies.results);
  showPage(dataMovies);
}
initExempl();
function showPage(data: fetchDataCinema): void {
  const pagination = new Pagination(data);
  console.log(pagination.element.children);
  list.append(...Array.from(pagination.element.children));
  console.log(data);
}

function showItem(data: movie[]): void {
  const movies = new ItemList(data);
  cinemaList.append(movies.element);
}

// function initEventListener() {
// list.addEventListener('page-changed', evt => {
//   const page: number = (evt as CustomEvent).detail;
//   console.log(page);
// });
// }
