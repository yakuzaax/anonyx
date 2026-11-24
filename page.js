import { initPage, mountSwitcher } from './i18n.js';
import './i18n-pages.js';
import './i18n-how.js';

initPage();
const select = document.getElementById('lang');
if (select) mountSwitcher(select);
