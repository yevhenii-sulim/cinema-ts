class e{constructor({totalPages:e,page:t=1,showedPage:s=5}={}){this.totalPages=e,this.page=t,this.showedPage=s,this.render(this.page),this.addEventListeners()}getTeamplateList(e){return`<li class="pagination page ${e===this.page?"active":""}" data-page-index="${e}"><button>${e}</button></li>`}showedCountPages(){return this.totalPages<this.showedPage?this.totalPages:this.showedPage}pages(e){const t=[],s=[];for(let i=e;i<this.showedCountPages()+e;i++)s.push(i),t.push(this.getTeamplateList(i));return this.listPage=s,t.join("")}render(e){const t=this.pages(e),s=document.querySelector(".pagination-list");s.insertAdjacentHTML("beforeend",t),this.element=s}upDateRender(e){e>this.totalPages||e<1||(this.element.innerHTML=this.pages(e))}addEventListeners(){const e=this.element.parentNode.querySelector(".next"),t=this.element.parentNode.querySelector(".prev");e.addEventListener("click",(()=>{this.nextPage()})),t.addEventListener("click",(()=>{this.prevPage()})),this.element.addEventListener("click",(e=>{e.target;const t=e.target.closest(".page");if(!t)return;const s=parseInt(t.dataset.pageIndex);this.setPage(s)}))}setPage(e){if(e===this.page)return;if(e>this.totalPages||e<1)return;const t=document.querySelector(".page.active");t&&t.classList.remove("active");document.querySelector(`[data-page-index="${e}"]`).classList.add("active"),this.page=e}nextPage(){const e=this.page+1;e>Math.max(...this.listPage)&&this.upDateRender(e-(this.showedPage-1)),this.setPage(e)}prevPage(){const e=this.page-1;e<Math.min(...this.listPage)&&this.upDateRender(e),this.setPage(e)}}class t{constructor(e,t){this.product=e,this.genre=t,this.render()}getTemplate(){return`\n        <li class="film">\n        <a href="#" class="link-film">\n          <img src="https://image.tmdb.org/t/p/w500${this.product.poster_path}" alt="film" class="img-film">\n          <h2 class="tytle-film">${this.product.title}</h2>\n          <p class="ganre-film">${this.genre}t</p>\n        </a>\n      </li>\n    `}render(){const e=document.createElement("div");e.innerHTML=this.getTemplate(),this.element=e.firstElementChild}}class s{constructor(e=[]){this.itemList=e}render(){return this.itemList.map((async e=>{const s=await async function(e){const t=await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en",{headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM",accept:"application/json"}});return(await t.json()).genres.filter((t=>e.genre_ids.includes(t.id))).map((({name:e})=>e)).join(", ")}(e);return new t(e,s).element})).join("")}}fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",{headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM",accept:"application/json"}}).then((e=>e.json())).then((t=>{!function(t){const s=new e(t);a.append(...Array.from(s.element.children))}(t),function(e){const t=new s(e);i.insertAdjacentHTML("beforeend",t.render())}(t.results)}));const i=document.querySelector(".cinema-list"),a=document.querySelector(".pagination-list");
//# sourceMappingURL=index.80380096.js.map
