interface Itemtype {
  image: string;
  tytle: string;
  ganre: string[];
}

export interface movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default class Item {
  product: movie;
  genre: string;
  element: Element;

  constructor(product: movie, genre: string) {
    this.product = product;
    this.genre = genre;
    this.render();
  }

  getTemplate(): string {
    return `
        <li class="film">
        <a href="#" class="link-film">
          <img src="https://image.tmdb.org/t/p/w500${
            this.product.poster_path
          }" alt="film" class="img-film">
          <h2 class="tytle-film">${this.product.title}</h2>
          <p class="ganre-film">${
            this.genre
          } | ${this.product.release_date.slice(0, 4)}</p>
        </a>
      </li>
    `;
  }
  render(): void {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.innerHTML = this.getTemplate();
    this.element = wrapper.firstElementChild;
  }
}
