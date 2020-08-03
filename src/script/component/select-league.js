import champions from '../../assets/img/champions-league.png';
import premier from '../../assets/img/premier-league.png';
import laLiga from '../../assets/img/laliga.png';
import seriA from '../../assets/img/seri-a.png';
import bundesLeague from '../../assets/img/bundes-league.png';
import eredivisie from '../../assets/img/eredivisie.png';
import league1 from '../../assets/img/league-1.png';

class SelectLeague extends HTMLElement {
    constructor() {
        super();

        this.attributSelect = this.getAttribute('class');
    }

    connectedCallback() {
        this.render();
    }

    set changeEvent(event) {
        this._changeEvent = event;
        this.render();
    }

    set title(title) {
        this._title = title;
        this.render();
    }

    get valueSelect() {
        return this.querySelector('#select-league').value;
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <h5 class="center">${this._title === 'select-standings' ? 'KLASEMEN LIGA' : 'JADWAL PERTANDINGAN'}</h5>
            <hr>
            <div class="col s12 m12 l12">
                <select id="select-league">
                    <option value="" disabled>Pilih Liga</option>
                    <option value="2001" data-icon="${champions}" selected>Liga Champions</option>
                    <option value="2021" data-icon="${premier}">Liga Premier Inggris</option>
                    <option value="2014" data-icon="${laLiga}">La Liga Spanyol</option>
                    <option value="2019" data-icon="${seriA}">Liga Italia Seri A</option>
                    <option value="2002" data-icon="${bundesLeague}">Liga Bundes Jerman</option>
                    <option value="2003" data-icon="${eredivisie}">Eredivisie Belanda</option>
                    <option value="2015" data-icon="${league1}">Liga 1 Prancis</option>
                </select>
            </div>
        </div>
        `;

        this.querySelector('#select-league').addEventListener('change', this._changeEvent);

        // auto init materialize
        M.AutoInit();

    }
}

customElements.define('select-league', SelectLeague);