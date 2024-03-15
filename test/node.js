// 获取图片元素
const img = document.querySelector('.swiper-slide img');

// 定义图片列表
const imageList = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  // 添加更多图片路径...
];

let index = 0;

// 定时更换图片
setInterval(() => {
  index = (index + 1) % imageList.length;
  const imageUrl = imageList[index];
  img.src = imageUrl;
}, 5000); // 更换图片的时间间隔，单位为毫秒
