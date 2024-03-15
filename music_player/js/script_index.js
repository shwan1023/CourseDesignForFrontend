// 等待 DOM 内容完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 通过 ID 获取页眉元素
    var header = document.getElementById('myHeader');
    // 通过 ID 获取页面元素
    var page = document.getElementById('page');
    // 通过 ID 获取打开菜单的按钮
    var openMenuButton = document.getElementById('openmenu');
    header.classList.add('sticky');
    // 向窗口添加滚动事件监听器
    window.addEventListener('scroll', function() {
        // 当滚动时，从页面元素中移除 'menuopen' 类
        page.classList.remove('menuopen');
        // 检查垂直滚动位置是否大于或等于 100 像素
        if (window.scrollY >= 100) {
            // 当向下滚动时，向页眉添加 'sticky' 类
            header.classList.add('sticky');
        } else {
            // 当向上滚动时，从页眉移除 'sticky' 类
            header.classList.remove('sticky');
        }
    });

    // 向打开菜单的按钮添加点击事件监听器
    openMenuButton.addEventListener('click', function() {
        // 当按钮被点击时，从页眉移除 'sticky' 类
        header.classList.remove('sticky');
        // 当按钮被点击时，向页面添加 'menuopen' 类
        page.classList.add('menuopen');
    });

    // 选择所有 href 属性以 '#' 开头的链接
    var links = document.querySelectorAll('a[href^="#"]');

    // 为每个链接添加点击事件监听器
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 阻止链接的默认行为
            event.preventDefault();

            // 从链接的 href 属性中获取目标元素的 ID
            var targetId = this.getAttribute('href');
            // 在文档中查找目标元素
            var targetElement = document.querySelector(targetId);

            // 如果目标元素存在，则平滑滚动到该元素
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // 使用平滑滚动效果
                });
            }
        });
    });
});
