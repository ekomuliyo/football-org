import 'regenerator-runtime';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import main from './script/view/main.js';

document.addEventListener('DOMContentLoaded', main);































// document.addEventListener('DOMContentLoaded', function() {
//     // periksa service worker
//     if('serviceWorker' in navigator) {
//         window.addEventListener('load', function() {
//             navigator.serviceWorker
//                 .register('/service-worker.js')
//                 .then(() => {
//                     console.log('berhasil menambahkan service worker!') 
//                 }).catch(() => {
//                     console.log('gagal menambahkan service worker!') 
//                 }); 
//         });
//     }
//     else {
//         console.log('browser tidak didudukung!')
//     }

//     // initial menu sidenav
//     const elementSideNav = document.querySelector('.sidenav');
//     M.Sidenav.init(elementSideNav);

//     // initial tab
//     const elementTab = document.querySelector('.tabs')
//     M.Tabs.init(elementTab);

//     // load menu
//     loadMenu();
// });


// const loadMenu = () => {
    
//     // menu top
//     fetch('pages/nav/top-nav.html')
//         .then(response => {
//             return response.text();
//         })
//         .then(data => {

//             document.querySelectorAll('.topnav').forEach(e => {
//                 e.innerHTML = data;
//             })

//             document.querySelectorAll('.topnav').forEach(e => {
//                 e.addEventListener('click', function(e) {

//                 });
//             })
//         })
//         .catch(error => console.log(error));
    
//     // menu side
//     fetch('pages/nav/side-nav.html')
//     .then(response => {
//         return response.text();
//     })
//     .then(data => {

//         document.querySelectorAll('.sidenav').forEach(e => {
//             e.innerHTML = data;
//         })

//         document.querySelectorAll('.sidenav a').forEach(e => {
//             e.addEventListener('click', function(e) {

//             });
//         })
//     })
//     .catch(error => console.log(error));
// }