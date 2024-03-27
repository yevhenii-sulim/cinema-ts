import axios, { AxiosResponse } from 'axios';
import Item from './item';
import { movie } from './item';

interface listGanres {
  genres: itemGanre[];
}

interface itemGanre {
  id: number;
  name: string;
}
// AxiosResponse<itemGanre>
async function displayGanres(): Promise<listGanres> {
  const data: any = axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
        accept: 'application/json',
      },
    }
  );
  const dataGenres = await data;
  return dataGenres.data;
}

export default class ItemList {
  itemList: movie[];
  element: Element;
  constructor(itemList: movie[] = []) {
    this.itemList = itemList;
    this.render();
  }

  async renderCard(): Promise<string> {
    return this.itemList
      .map(async item => {
        const movieGenre: listGanres = await displayGanres();
        const ganreMovie: string = movieGenre.genres
          .filter(genre => item.genre_ids.includes(genre.id))
          .map(({ name }) => name)
          .join(', ');
        const movie = new Item(item, ganreMovie);
        console.log(movie.element);
        return movie.element;
      })
      .join('');
  }

  async render(): Promise<void> {
    const wrapper: HTMLElement = document.querySelector('.cinema-list');
    const moviesList: string = await this.renderCard();
    wrapper.innerHTML = moviesList;
    this.element = wrapper;
  }
}
