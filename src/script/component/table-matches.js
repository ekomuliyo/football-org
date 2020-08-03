class TableMatches extends HTMLElement {
    constructor() {
        super();
    }

    set matches(matches) {
        this._matches = matches;
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <div class="row">
                        <table class="col s12 l12 highlight">
                            <tbody id="tbody-matches">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;

        let rowData = '';

        if(this._matches.length > 0) {
            this._matches.forEach(match => {

                const convertDate = new Date(match.utcDate);        
                
                let hari = convertDate.getDay();
                if(hari === 0) hari = 'Minggu';
                if(hari === 1) hari = 'Senin';
                if(hari === 2) hari = 'Selasa';
                if(hari === 3) hari = 'Rabu';
                if(hari === 4) hari = 'Kamis';
                if(hari === 5) hari = 'Jum\'at';
                if(hari === 6) hari = 'Sabtu';

                const tanggal = `${convertDate.getDate()}/${convertDate.getMonth()}/${convertDate.getFullYear()}` ;
                const jam = convertDate.getHours();
                const menit = convertDate.getMinutes();

                rowData += `
                    <tr>
                        <td>${hari}, ${tanggal} </br> ${jam < 10 ? `0${jam}` : jam} : ${menit < 10 ? `0${menit}` : menit}</td>
                        <td class="center-align">${match.homeTeam.name}</td>
                        <td class="center-align">-</td>
                        <td class="center-align">${match.awayTeam.name}</td>
                    </tr>
                    `;
            });
        }
        else {
            rowData += `
                <tr>
                    <td colspan="4">Tidak Ada Jadwal Pertandingan!</td>
                </tr>
                `;
        }

        document.querySelector('#tbody-matches').innerHTML = rowData;
        // console.log(rowData);
    }
}


customElements.define('table-matches', TableMatches);