"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item = /** @class */ (function () {
    function Item(product, genre) {
        this.product = product;
        this.genre = genre;
        this.render();
    }
    Item.prototype.getTemplate = function () {
        return "\n        <li class=\"film\">\n        <a href=\"#\" class=\"link-film\">\n          <img src=\"https://image.tmdb.org/t/p/w500".concat(this.product.poster_path, "\" alt=\"film\" class=\"img-film\">\n          <h2 class=\"tytle-film\">").concat(this.product.title, "</h2>\n          <p class=\"ganre-film\">").concat(this.genre, " | ").concat(this.product.release_date.slice(0, 4), "</p>\n        </a>\n      </li>\n    ");
    };
    Item.prototype.render = function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;
    };
    return Item;
}());
exports.default = Item;
