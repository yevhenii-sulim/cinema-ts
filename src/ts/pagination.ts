interface Pag {
  total_pages?: number;
  page?: number;
  showedPage?: number;
}

export default class Pagination {
  total_pages?: number;
  page?: number;
  showedPage?: number;
  listPage?: number[];
  element?: HTMLElement;

  constructor({ total_pages, page = 1, showedPage = 5 }: Pag = {}) {
    this.total_pages = total_pages;
    this.page = page;
    this.showedPage = showedPage;
    this.render(this.page);
    // this.addEventListeners();
  }

  getTeamplate(pages: number): string | null {
    const prev: string | null =
      this.total_pages > this.showedPage
        ? `<button type="button" class="prev">prev</button>`
        : null;
    const next: string | null =
      this.total_pages > this.showedPage
        ? `<button type="button" class="next">next</button>`
        : null;

    if (this.showedCountPages()) {
      return `
        ${prev}
        <ul class="pagination-list">
          ${this.pages(pages)}
        </ul>
        ${next}
      `;
    } else {
      return null;
    }
  }

  getTeamplateList(page: number): string {
    const active: string = page === this.page ? 'active' : '';
    return `
      <li class="pagination page ${active}" data-page-index="${page}">
        <button type="button">${page}</button>
      </li>
    `;
  }

  showedCountPages(): number {
    const counterPages: number =
      this.total_pages < this.showedPage ? this.total_pages : this.showedPage;
    return counterPages;
  }

  pages(pages: number): string {
    const list: string[] = [];
    const listPage: number[] = [];
    for (let page = pages; page < this.showedCountPages() + pages; page++) {
      listPage.push(page);
      list.push(this.getTeamplateList(page));
    }
    this.listPage = listPage;
    return list.join('');
  }

  render(page: number): void {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.innerHTML = this.getTeamplate(page);
    console.log(this.total_pages);
    this.element = wrapper;
  }

  upDateRender(page: number): void {
    if (page > this.total_pages || page < 1) return;
    this.element.querySelector('pagination-list').innerHTML = this.pages(page);
  }

  addEventListeners(): void {
    const next: HTMLElement = this.element.querySelector('.next');
    const prev: HTMLElement = this.element.querySelector('.prev');
    const pagination: HTMLElement = this.element.querySelector('.pagination');
    next.addEventListener('click', (): void => {
      this.nextPage();
    });

    prev.addEventListener('click', (): void => {
      this.prevPage();
    });
    console.log(pagination, 'zxcz');
    this.element.addEventListener('click', (evt): void => {
      const carrentPage: HTMLElement = (evt.target as HTMLElement).closest(
        '.page'
      );
      if (!carrentPage) return;

      if (carrentPage === this.element.querySelector('.pagination.active')) {
        return;
      }
      const pageIndex: number = parseInt(carrentPage.dataset.pageIndex);

      this.setPage(pageIndex);
    });
  }

  setPage(pageIndex: number): void {
    if (pageIndex === this.page) return;
    if (pageIndex > this.total_pages || pageIndex < 1) return;
    const activePage: HTMLElement = document.querySelector('.page.active');
    if (activePage) {
      activePage.classList.remove('active');
    }

    const carrentPage: HTMLElement = document.querySelector(
      `[data-page-index="${pageIndex}"]`
    );
    carrentPage.classList.add('active');
    this.dispatchEvent(pageIndex);
    this.page = pageIndex;
  }

  nextPage(): void {
    const nextPage: number = this.page + 1;
    if (nextPage > Math.max(...this.listPage)) {
      this.upDateRender(nextPage - (this.showedPage - 1));
    }
    this.setPage(nextPage);
  }

  prevPage(): void {
    const prevPage: number = this.page - 1;
    if (prevPage < Math.min(...this.listPage)) {
      this.upDateRender(prevPage);
    }
    this.setPage(prevPage);
  }
  dispatchEvent(pageIndex: number) {
    const customEvent: CustomEvent = new CustomEvent('page-changed', {
      detail: pageIndex,
    });
    this.element.dispatchEvent(customEvent);
  }
}
