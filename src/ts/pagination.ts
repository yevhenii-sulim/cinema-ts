// interface Pag {
//   totalPages: number,
//   page: number,
//   showedPage: number, 
//   listPage:number[],
// }

// export default class Pagination {
//   listPage:number[];
//   element:HTMLUListElement
//   constructor({totalPages: number,page: number,showedPage: number = 5}:Pag) {
//     this.totalPages = totalPages;
//     this.page = page;
//     this.showedPage = showedPage;
//     this.render(this.page)
//     this.addEventListeners()
//   }

export default class Pagination {

  listPage:number[];
  element:HTMLUListElement

  constructor(public totalPages: number,public page: number,public showedPage: number = 5) {
    this.totalPages = totalPages;
    this.page = page;
    this.showedPage = showedPage;
    this.render(this.page)
    this.addEventListeners()
  }
  
  getTeamplateList(page: number) {
    const active: string = page === this.page ? 'active' : ''
    return `<li class="pagination page ${active}" data-page-index="${page}"><button>${page}</button></li>`
  }
  
  showedCountPages() {
    const counterPages:number =
      this.totalPages < this.showedPage
        ? this.totalPages
        : this.showedPage;
    return counterPages;
  }
  
  pages(pages:number) {
    const list: string[] = [];
    const listPage: number[] = [];
    for (let page = pages; page < this.showedCountPages() + pages; page++) {     
      listPage.push(page)
      list.push(this.getTeamplateList(page))
    }
    this.listPage= listPage
    return list.join('')
  }
  
  render(page: number) {
    const listPage = this.pages(page)

    const wrapper: HTMLUListElement = document.querySelector('.pagination-list')
    wrapper.insertAdjacentHTML('beforeend', listPage)

    this.element = wrapper
  }
  
  upDateRender(page: number){
    if(page > this.totalPages || page < 1) return
    this.element.innerHTML = this.pages(page)
  }

  addEventListeners() {
    const next:HTMLElement = this.element.parentNode.querySelector('.next') 
    const prev:HTMLElement = this.element.parentNode.querySelector('.prev') 
    
    next.addEventListener('click', () => {
      this.nextPage()
    })
    prev.addEventListener('click', () => {
      this.prevPage()
    })

    this.element.addEventListener('click', (evt) => {
      const carrentPage: HTMLElement = evt.target.closest('.page')
      if (!carrentPage) {
        return
      };
      const pageIndex: number = parseInt(carrentPage.dataset.pageIndex)
      
      this.setPage(pageIndex)
    })
  }
  
  setPage(pageIndex: number) {
    if (pageIndex === this.page) return
    if(pageIndex > this.totalPages || pageIndex < 1) return
    const activePage:HTMLElement = document.querySelector('.page.active') 
    
    if (activePage) {
      activePage.classList.remove('active')
    }
    
    const carrentPage: HTMLElement = document.querySelector(`[data-page-index="${pageIndex}"]`)
    carrentPage.classList.add('active')
    this.dispatchEvent(pageIndex)
    this.page = pageIndex
  }

  nextPage() {
    const nextPage: number = this.page + 1
    if (nextPage > Math.max(...this.listPage)) {
      this.upDateRender(nextPage-(this.showedPage-1))
    }
    this.setPage(nextPage)
  }

  prevPage() {
    const prevPage: number = this.page - 1
    if ( prevPage < Math.min(...this.listPage)) {
      this.upDateRender(prevPage)
    }
    this.setPage(prevPage)
  }
  dispatchEvent(pageIndex) {
    const customEvent = new CustomEvent('page-changed', {
      detail: pageIndex,
    })
    this.element.dispatchEvent(customEvent)
  }
}