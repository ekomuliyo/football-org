import logo from '../../assets/img/icon-128x128.png';
import pp from '../../assets/img/pp.png';

class NavBar extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav class="#66bb6a green lighten-1" role="navigation">
            <div class="nav-wrapper container">
                <ul class="topnav left hide-on-med-and-down">
                    <li><a href="#standings">Klasemen</a></li>
                    <li><a href="#matches">Pertandingan</a></li>
                    <li><a href="#club-saved">Klub Tersimpan</a></li>
                </ul>
                <a href="#" class="brand-logo center flow-text" id="logo-container">
                    <img src="${logo}" width="23px" alt="Logo"> Bola
                </a>
    
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="sidenav" id="nav-mobile">
                <li>
                    <div class="user-view">
                        <div class="background #66bb6a green lighten-1">
                        </div>
                        <a href="#"><img class="circle" src="${pp}"></a>
                        <a href="#"><span class="white-text name">Eko Muliyo</span></a>
                        <a href="#"><span class="white-text email">ekomuliyo@gmail.com</span></a>
                    </div>
                </li>
                    <li><a href="#standings"><i class="material-icons">home</i>Klasemen</a></li>
                    <li><a href="#matches"><i class="material-icons">trending_up</i>Pertandingan</a></li>
                    <li><a href="#club-saved"><i class="material-icons">save</i>Klub Tersimpan</a></li>
                </ul>
            </div>
        </nav>
        `;
    
        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
            elm.addEventListener('click', function(event) {

            // Tutup sidenav
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            const page = event.target.getAttribute('href').substr(1);

            const selectLeague = document.querySelector('select-league');
            const contentStandings = document.querySelector('.content-standings');
            const contentMatches = document.querySelector('.content-matches');
            const contentClubSaved = document.querySelector('.content-clubs-saved');

            if(page) {
                if(page === '' || page === 'standings') {
                    // show 
                    selectLeague.style.display = 'block';
                    // selectLeague.setAttribute('class', 'select-standings');
                    selectLeague.title = 'select-standings';
                    contentStandings.style.display = 'block';

                    // hide 
                    contentMatches.style.display = 'none';
                    contentClubSaved.style.display = 'none';
                }
                else if(page === 'matches') {
                    // show
                    selectLeague.style.display = 'block';
                    // selectLeague.setAttribute('class', 'select-matches');
                    selectLeague.title = 'select-matches';
                    contentMatches.style.display = 'block';

                    // hide
                    contentStandings.style.display = 'none';
                    contentClubSaved.style.display = 'none';
                }
                else if(page === 'club-saved') {
                    // show
                    contentClubSaved.style.display = 'block';

                    // hide
                    selectLeague.style.display = 'none';
                    contentStandings.style.display = 'none';
                    contentMatches.style.display = 'none';
                }
            }

            const elemsDatepicker = document.querySelectorAll('.datepicker');
            M.Datepicker.init(elemsDatepicker, {
                format: 'yyyy-mm-dd',
                autoClose: true,
                setDefaultDate: true,
                defaultDate: new Date()
            });
            
            });
        });
    }
}

customElements.define('nav-bar', NavBar);