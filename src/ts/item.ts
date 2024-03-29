import { movie } from './interface';

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
