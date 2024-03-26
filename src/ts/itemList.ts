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
  const ganreMovie: string[] = dataGanres.genres
    .filter(item => data.genre_ids.includes(item.id))
    .map(({ name }) => name);
  return ganreMovie.join(', ');
}

export default class ItemList {
  itemList: movie[];

  constructor(itemList: movie[] = []) {
    this.itemList = itemList;
  }
  render(): string {
    return this.itemList
      .map(async item => {
        const genre: string = await displayGanres(item);
        const movie = new Item(item, genre);
        return movie.element;
      })
      .join('');
  }
}
