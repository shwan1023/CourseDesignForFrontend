// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 添加到购物车按钮事件监听
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // 购物车图标点击事件监听
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', showCart);

    function addToCart(event) {
        // 实现添加到购物车的逻辑
        console.log('商品已添加到购物车');
    }

    function showCart() {
        // 实现显示购物车的逻辑
        console.log('显示购物车');
    }
});
