class ApiInterface {
    constructor() {
        this.headers = { headers: { 'X-Auth-Token': 'f6d767e7cb71480bb41416a5e73c753f'}};
        this.baseUrl = 'https://api.football-data.org/v2';
    }

    getStandings(idLeague) {
        return fetch(`${this.baseUrl}/competitions/${idLeague}/standings`, this.headers)
                .then(response => {
                    return response.ok ? response.json() : Promise.reject(`Server bermasalah ! pesan : ${response.statusText} kode : ${response.status}`);
                })
                .then(responseData => responseData.standings)
                .catch(error => error);
    }

    getMatches(idLeague, date) {
        return fetch(`${this.baseUrl}/competitions/${idLeague}/matches?status=SCHEDULED&dateFrom=${date}&dateTo=${date}`, this.headers)
                .then(response => {
                    return response.ok ? response.json() : Promise.reject(`Server bermasalah ! pesan : ${response.statusText} kode : ${response.status}`);
                })
                .then(responseData => responseData.matches)
                .catch(error => error);
    }

    getClubById(idClub) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/teams/${idClub}`, this.headers)
                .then(response => {
                    return response.ok ? response.json() : Promise.reject(`Server bermasalah ! pesan : ${response.statusText} kode : ${response.status}`);
                })
                .then(responseData => resolve(responseData))
                .catch(error => reject(error));
        });
    }


}

export default ApiInterface;