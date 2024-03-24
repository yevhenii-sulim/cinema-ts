import Pagination from './ts/pagination';
const key: string = 'ef54c316f166b2a5913791e8b3f63a4a';
const page: number = 1;
fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
      accept: 'application/json',
    },
  }
)
  .then(data => data.json())
  .then(data => {
    console.log(data);
    return showPage(data);
  });

const list: HTMLElement = document.querySelector('.pagination-list');
function showPage(data: any) {
  const pagination = new Pagination(data);
  list.append(...Array.from(pagination.element.children));
  pagination.element.parentNode.addEventListener('page-changed', e => {
    console.log(e);
  });
}
