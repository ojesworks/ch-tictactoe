console.log('hello world');
import { HomePage } from './pages/home';
import { SettingPage } from './pages/setting-page';

// document.querySelector('#app').innerHTML = '<home-page></home-page>';
// document.querySelector('home-page').addEventListener('change_page', console.log);

document.querySelector('#app').innerHTML = '<setting-page></setting-page>';
document.querySelector('setting-page').addEventListener('change_page', console.log);
