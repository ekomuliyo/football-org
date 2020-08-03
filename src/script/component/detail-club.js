class DetailClub extends HTMLElement {
    constructor() {
        super();
    }

    set club(club) {
        this._club = club;
        this.render();
    }

    set clickEventFab(event) {
        this._clickEventFab = event;
        this.render();
    }

    set stateFab(state) {
        this._stateFab = state;
        this.render();
    }

    render() {
        
        this.innerHTML = `
            <div class="container">
                <div class="col s12 m7">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12 m12 l12 center-align">
                                    <img src="${this._club.crestUrl}" style="max-width: 150px;" alt="Logo Klub ${this._club.shortName}">
                                </div>
                                <div class="col s12 m12 l12 center-align">
                                    <h4>${this._club.shortName}</h4>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Nama</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: ${this._club.name}</span>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Alamat</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: ${this._club.address}</span>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Berdiri</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: ${this._club.founded}</span>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Stadion</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: ${this._club.venue}</span>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Website</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: <a href="${this._club.website}" target="_blank">${this._club.website}</a></span>
                                </div>
                                <div class="col s3 m3 l3">
                                    <span>Email</span>
                                </div>
                                <div class="col s9 m9 l9 left-align">
                                    <span>: ${this._club.email ? this._club.email : '-'}</span>
                                </div>
                                <div class="col s12 m12 l12">
                                    <h5>Pemain Tim</h5>
                                    <table class="highlight">
                                        <thead>
                                            <tr>
                                                <th class="center-align">Nama</th>
                                                <th class="center-align">Posisi</th>
                                                <th class="center-align">Asal Negara</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${this._club.squad.map(squad => {
                                                if(squad.role === 'PLAYER') {
                                                    return `
                                                    <tr>
                                                        <td>${squad.name}</td>
                                                        <td class="center-align">${squad.position}</td>
                                                        <td class="center-align">${squad.nationality}</td>
                                                    </tr>`;
                                                }
                                            }).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${!this._stateFab ? `<div class="fixed-action-btn">
                                    <a class="btn-floating btn-large red btn-save" id="btn-save">
                                        <i class="large material-icons">save</i>
                                    </a>
                                </div>` 
                            : `<div class="fixed-action-btn">
                                    <a class="btn-floating btn-large red btn-remove" id="btn-remove">
                                        <i class="large material-icons">remove</i>
                                    </a>
                                </div>`}
        `;

        this.querySelector('.fixed-action-btn').addEventListener('click', this._clickEventFab);
    }
}

customElements.define('detail-club', DetailClub);