// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn = document.querySelector('.j-btn-test');


btn.addEventListener('click', () => {
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
  alert('Размер экрана: ' + screenWidth + 'x' + screenHeight)
})