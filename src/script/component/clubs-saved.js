class ClubsSaved extends HTMLElement {
    constructor() {
        super();
    }

    set clubs(clubs) {
        this._clubs = clubs;
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container" id="body-content"></div>
        `;

        let clubsHTML = '';

        if(this._clubs.length > 0) {
            this._clubs.forEach(club => {
                clubsHTML += `
                    <div class="col s12 m7">
                        <div class="card">
                            <a href="./club-detail.html?id=${club.id}&saved=true">
                            <div class="card-content">
                                <div class="row">
                                        <div class="col s12 m12 l12 center-align">
                                            <img src="${club.crestUrl.replace(/^http:\/\//i, 'https://')}" style="max-width: 150px;" alt="Logo Club ${club.shortName}">
                                        </div>
                                        <div class="col s12 m12 l12 center-align">
                                            <h4>${club.shortName}</h4>
                                        </div>
                                        <div class="col s3 m3 l3">
                                            <span>Nama</span>
                                        </div>
                                        <div class="col s9 m9 l9 left-align">
                                            <span>: ${club.name}</span>
                                        </div>
                                        <div class="col s3 m3 l3">
                                            <span>Alamat</span>
                                        </div>
                                        <div class="col s9 m9 l9 left-align">
                                            <span>: ${club.address}</span>
                                        </div>
                                        <div class="col s3 m3 l3">
                                            <span>Berdiri</span>
                                        </div>
                                        <div class="col s9 m9 l9 left-align">
                                            <span>: ${club.founded}</span>
                                        </div>
                                        <div class="col s3 m3 l3">
                                            <span>Stadion</span>
                                        </div>
                                        <div class="col s9 m9 l9 left-align">
                                            <span>: ${club.venue}</span>
                                        </div>
                                        <div class="col s3 m3 l3">
                                            <span>Website</span>
                                        </div>
                                        <div class="col s9 m9 l9 left-align">
                                            <span>: <a href="${club.website}" target="_blank">${club.website}</a></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            });
        }
        else {
            clubsHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col s12 m12 l12 center-align">
                            <h5>Tidak Ada Klub Tersimpan :)</h5>
                        </div>
                    </div>
                </div>
            `;
        }

        this.querySelector('#body-content').innerHTML = clubsHTML;
    }
}

customElements.define('clubs-saved', ClubsSaved);