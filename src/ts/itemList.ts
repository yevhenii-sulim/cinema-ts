import axios, { AxiosResponse } from 'axios';
import Item from './item';
import { fetchDataCinema } from './interface';

interface listGanres {
  genres: itemGanre[];
}

interface itemGanre {
  id: number;
  name: string;
}

async function displayGanres(): Promise<listGanres> {
  const data: AxiosResponse<listGanres> = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
        accept: 'application/json',
      },
    }
  );
  return data.data;
}

export default class ItemList {
  itemList: fetchDataCinema;
  element: Element;
  constructor(itemList: fetchDataCinema = {}) {
    this.itemList = itemList;
    this.renderCard();
  }

  async renderCard(): Promise<void> {
    const wrapper: HTMLElement = document.createElement('ul');
    this.element = wrapper;
    const movieGenre: listGanres = await displayGanres();
    const genreMovieList: itemGanre[] = movieGenre.genres;
    console.log(this.itemList);
    this.itemList.results?.map(async item => {
      const genreMovie: string = genreMovieList
        .filter(genre => item.genre_ids.includes(genre.id))
        .map(({ name }) => name)
        .join(', ');
      const movie = new Item(item, genreMovie);
      wrapper.appendChild(movie.element);
    });
  }
}
