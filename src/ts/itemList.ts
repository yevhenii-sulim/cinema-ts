import Item from './item';
import { movie } from './item';

interface itemGanre {
  id: number;
  name: string;
}

interface listGanres {
  genres: itemGanre[];
}
async function displayGanres(data: movie): Promise<string> {
  const ganresNumber: Response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
        accept: 'application/json',
      },
    }
  );
  const dataGanres: listGanres = await ganresNumber.json();
  const ganreMovie: string = dataGanres.genres
    .filter(item => data.genre_ids.includes(item.id))
    .map(({ name }) => name)
    .join(', ');
  return ganreMovie;
}

export default class ItemList {
  itemList: movie[];
  element: Element;
  constructor(itemList: movie[] = []) {
    this.itemList = itemList;
    this.render();
  }

  async renderCard(): Promise<string> {
    return await this.itemList
      .map(async item => {
        const movieGenre: string = await displayGanres(item);
        const movie = new Item(item, movieGenre);
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
