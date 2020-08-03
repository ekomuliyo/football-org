class TableStandings extends HTMLElement {
    constructor() {
        super();
    }

    set standings(standings) {
        this._standings = standings;
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <table class="col s12 highlight cented">
                        <tbody id="tbody-standings">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

        // handel jika liga yang dipilih liga champions
        let rowData = '';
        if(this._standings.length !== 3) {
            this._standings.forEach((data, index) => {
                if(index % 3 === 0) {
                    rowData += `
                        <thead>
                            <tr>
                                <td colspan="7" class="center-align">${data.group}</td>
                            </tr>
                            <tr>
                                <th>No</th>
                                <th>Klub</th>
                                <th>MN</th>
                                <th>M</th>
                                <th>S</th>
                                <th>K</th>
                                <th>Poin</th>
                            </tr>
                        </thead>
                    `;

                    data.table.forEach((klub, index) => {
                        rowData += `
                            <tr>
                                <td>${++index}</td>
                                <td>
                                    <a href="./club-detail.html?id=${klub.team.id}">
                                    <img src="${klub.team.crestUrl}" width="17px" alt="Logo Klub ${klub.team.name}"> &nbsp; ${klub.team.name}
                                    </a>
                                </td>
                                <td>${klub.playedGames}</td>
                                <td>${klub.won}</td>
                                <td>${klub.draw}</td>
                                <td>${klub.lost}</td>
                                <td>${klub.points}</td>
                            </tr>
                        `;
                    });
                };
            });
        }
        else {
            this._standings[0].table.forEach((klub, index) => {
                rowData += `
                    <tr>
                        <td>${++index}</td>
                        <td>
                            <a href="./club-detail.html?id=${klub.team.id}">
                            <img src="${klub.team.crestUrl}" width="17px" alt="Logo Klub ${klub.team.name}"> &nbsp; ${klub.team.name}
                            </a>
                        </td>
                        <td>${klub.playedGames}</td>
                        <td>${klub.won}</td>
                        <td>${klub.draw}</td>
                        <td>${klub.lost}</td>
                        <td>${klub.points}</td>
                    </tr>
                    `;
            });
        }

        document.querySelector('#tbody-standings').innerHTML = rowData;
    }
}

customElements.define('table-standings', TableStandings);