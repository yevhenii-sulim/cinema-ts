import Pagination from './ts/pagination';
import ItemList from './ts/itemList';
import axios, { AxiosResponse } from 'axios';
import { fetchDataCinema } from './ts/interface';

axios.defaults.baseURL = 'https://api.themoviedb.org';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM';
axios.defaults.headers.get['accept'] = 'application/json';

interface Data {
  movies?: ItemList;
  pagination?: Pagination;
}
export default class Cinema {
  component: Data;
  data?: fetchDataCinema;
  element: HTMLElement;
  constructor() {
    this.data = {};
    this.component = {};
    this.updata(1);
    this.initComponents();
    this.render();
    this.renderComponent();
  }
  async loadData(pageIndex: number): Promise<fetchDataCinema> {
    const data: AxiosResponse<fetchDataCinema> = await axios.get(
      `/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&sort_by=popularity.desc`
    );
    return data.data;
  }

  getTeamplate(): string {
    return `
      <div class="cinema-list" data-element="movies-list"></div>
      <div class="pagination-container" data-element="pagination"></div>
    `;
  }
  initComponents(): void {
    const pagination = new Pagination(this.data);
    const movies = new ItemList(this.data);

    this.component.pagination = pagination;
    this.component.movies = movies;
  }
  renderComponent(): void {
    const moviesList = this.element.querySelector(
      '[data-element="movies-list"]'
    );
    const pagination = this.element.querySelector(
      '[data-element="pagination"]'
    );
    moviesList.append(this.component.movies.element);
    pagination.append(
      ...Array.from(this.component.pagination.element.children)
    );
  }
  render(): void {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.innerHTML = this.getTeamplate();
    this.element = wrapper;
  }
  async updata(pageIndex: number): Promise<void> {
    const data = await this.loadData(pageIndex);
    console.log(data);
    this.component.movies.renderCard();
  }
}

const page = new Cinema();
const main: HTMLElement = document.querySelector('main');
main.append(page.element);
console.log('page', page.element);

// async function fetchData(pageIndex: number): Promise<fetchDataCinema> {
//   const dataMovies: AxiosResponse<fetchDataCinema> = await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&sort_by=popularity.desc`,
//     {
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
//         accept: 'application/json',
//       },
//     }
//   );
//   return dataMovies.data;
// }

// async function initExempl(): Promise<void> {
//   // const list: HTMLElement = document.querySelector('.pagination-container');
//   // list.addEventListener('page-changed', evt => {
//   //   console.log((evt as CustomEvent).detail, 'sdf');
//   // });
//   // const cinemaList: HTMLElement = document.querySelector('.cinema-list');
//   const dataMovies: fetchDataCinema = await fetchData(1);
//   showItem(dataMovies);
//   showPage(dataMovies);
// }
// initExempl();

// function showPage(data: fetchDataCinema): void {
//   const pagination = new Pagination(data);
//   console.log(pagination);
//   // list.append(...Array.from(pagination.element.children));
// }

// function showItem(data: fetchDataCinema): void {
//   const movies = new ItemList(data);
//   console.log(movies);
//   // cinemaList.append(movies.element);
// }

// // function initEventListener() {
// //   list.addEventListener('page-changed', evt => {
// //     const page: number = (evt as CustomEvent).detail;
// //     console.log(page);
// //   });
// // }
