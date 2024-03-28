"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pagination = /** @class */ (function () {
    function Pagination(_a) {
        var _b = _a === void 0 ? {} : _a, totalPages = _b.totalPages, _c = _b.page, page = _c === void 0 ? 1 : _c, _d = _b.showedPage, showedPage = _d === void 0 ? 5 : _d;
        this.totalPages = totalPages;
        this.page = page;
        this.showedPage = showedPage;
        this.render(this.page);
        this.addEventListeners();
    }
    Pagination.prototype.getTeamplateList = function (page) {
        var active = page === this.page ? 'active' : '';
        return "<li class=\"pagination page ".concat(active, "\" data-page-index=\"").concat(page, "\"><button>").concat(page, "</button></li>");
    };
    Pagination.prototype.showedCountPages = function () {
        var counterPages = this.totalPages < this.showedPage ? this.totalPages : this.showedPage;
        return counterPages;
    };
    Pagination.prototype.pages = function (pages) {
        var list = [];
        var listPage = [];
        for (var page = pages; page < this.showedCountPages() + pages; page++) {
            listPage.push(page);
            list.push(this.getTeamplateList(page));
        }
        this.listPage = listPage;
        return list.join('');
    };
    Pagination.prototype.render = function (page) {
        var listPage = this.pages(page);
        var wrapper = document.querySelector('.pagination-list');
        wrapper.insertAdjacentHTML('beforeend', listPage);
        this.element = wrapper;
    };
    Pagination.prototype.upDateRender = function (page) {
        if (page > this.totalPages || page < 1)
            return;
        this.element.innerHTML = this.pages(page);
    };
    Pagination.prototype.addEventListeners = function () {
        var _this = this;
        var next = this.element.parentNode.querySelector('.next');
        var prev = this.element.parentNode.querySelector('.prev');
        next.addEventListener('click', function () {
            _this.nextPage();
        });
        prev.addEventListener('click', function () {
            _this.prevPage();
        });
        this.element.addEventListener('click', function (evt) {
            var carrentPage = evt.target.closest('.page');
            if (!carrentPage) {
                return;
            }
            var pageIndex = parseInt(carrentPage.dataset.pageIndex);
            _this.setPage(pageIndex);
        });
    };
    Pagination.prototype.setPage = function (pageIndex) {
        if (pageIndex === this.page)
            return;
        if (pageIndex > this.totalPages || pageIndex < 1)
            return;
        var activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.classList.remove('active');
        }
        var carrentPage = document.querySelector("[data-page-index=\"".concat(pageIndex, "\"]"));
        carrentPage.classList.add('active');
        this.dispatchEvent(pageIndex);
        this.page = pageIndex;
    };
    Pagination.prototype.nextPage = function () {
        var nextPage = this.page + 1;
        if (nextPage > Math.max.apply(Math, this.listPage)) {
            this.upDateRender(nextPage - (this.showedPage - 1));
        }
        this.setPage(nextPage);
    };
    Pagination.prototype.prevPage = function () {
        var prevPage = this.page - 1;
        if (prevPage < Math.min.apply(Math, this.listPage)) {
            this.upDateRender(prevPage);
        }
        this.setPage(prevPage);
    };
    Pagination.prototype.dispatchEvent = function (pageIndex) {
        var customEvent = new CustomEvent('page-changed', {
            detail: pageIndex,
        });
        this.element.dispatchEvent(customEvent);
    };
    return Pagination;
}());
exports.default = Pagination;
