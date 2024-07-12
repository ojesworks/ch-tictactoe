console.log('hello world');

document.querySelector('#app').innerHTML = '<home-page></home-page>';
document.querySelector('home-page').addEventListener('change_page', console.log);
