interface Pag {
  totalPages?: number;
  page?: number;
  showedPage?: number;
}

export default class Pagination {
  totalPages?: number;
  page?: number;
  showedPage?: number;
  listPage?: number[];
  element?: HTMLUListElement;

  constructor({ totalPages, page = 1, showedPage = 5 }: Pag = {}) {
    this.totalPages = totalPages;
    this.page = page;
    this.showedPage = showedPage;
    this.render(this.page);
    this.addEventListeners();
  }

  getTeamplateList(page: number): string {
    const active: string = page === this.page ? 'active' : '';
    return `<li class="pagination page ${active}" data-page-index="${page}"><button>${page}</button></li>`;
  }

  showedCountPages(): number {
    const counterPages: number =
      this.totalPages < this.showedPage ? this.totalPages : this.showedPage;
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
    const listPage = this.pages(page);

    const wrapper: HTMLUListElement =
      document.querySelector('.pagination-list');
    wrapper.insertAdjacentHTML('beforeend', listPage);

    this.element = wrapper;
  }

  upDateRender(page: number): void {
    if (page > this.totalPages || page < 1) return;
    this.element.innerHTML = this.pages(page);
  }

  addEventListeners(): void {
    const next: HTMLElement = this.element.parentNode.querySelector('.next');
    const prev: HTMLElement = this.element.parentNode.querySelector('.prev');

    next.addEventListener('click', (): void => {
      this.nextPage();
    });
    prev.addEventListener('click', (): void => {
      this.prevPage();
    });

    this.element.addEventListener('click', (evt): void => {
      let evtTarget: EventTarget = evt.target;
      const carrentPage: HTMLElement = (evt.target as HTMLElement).closest(
        '.page'
      );
      if (!carrentPage) {
        return;
      }
      const pageIndex: number = parseInt(carrentPage.dataset.pageIndex);

      this.setPage(pageIndex);
    });
  }

  setPage(pageIndex: number): void {
    if (pageIndex === this.page) return;
    if (pageIndex > this.totalPages || pageIndex < 1) return;
    const activePage: HTMLElement = document.querySelector('.page.active');

    if (activePage) {
      activePage.classList.remove('active');
    }

    const carrentPage: HTMLElement = document.querySelector(
      `[data-page-index="${pageIndex}"]`
    );
    carrentPage.classList.add('active');
    // this.dispatchEvent(pageIndex);
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
  // dispatchEvent(pageIndex) {
  //   const customEvent = new CustomEvent('page-changed', {
  //     detail: pageIndex,
  //   });
  //   this.element.dispatchEvent(customEvent);
  // }
}
