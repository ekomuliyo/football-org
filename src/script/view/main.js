import ApiInterface from '../api/apiInterface.js';
import ApiIndexedDB from '../api/apiIndexedDB.js';

import '../component/progress-bar.js';
import '../component/select-league.js';
import '../component/table-standings.js';
import '../component/table-matches.js';
import '../component/detail-club.js';
import '../component/nav-bar.js';
import '../component/nav-bar-detail.js';
import '../component/date-matches.js';
import '../component/clubs-saved.js';

const main = () => {

    window.addEventListener('load', function(){
        // cek support service worker
        if('serviceWorker' in navigator){
            navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => console.log('berhasil menambahkan service worker'))
            .catch(() => console.log('gagal menambahkan service worker'));
        }
        else{
            alert('browser tidak mendukung service worker');
        }
        
        const page = window.location.pathname;
        if(page !== '/club-detail.html') {
            onSelectChange();
        }

        requestPermission();
    });
    
    window.addEventListener('click', function(e) {
        
        const page =  e.target.getAttribute('href');
        
        if(page === '#standings') {
            onSelectChange();
        }

        if(page === '#club-saved') {
            showClubsSaved();
        }
    });
    
    const apiInterface = new ApiInterface();
    const apiIndexedDB = new ApiIndexedDB();

    const selectLeagueElement = document.querySelector('select-league');
    const dateMathcesElement = document.querySelector('date-matches');
    const progressBarElement = document.querySelector('progress-bar');
    const tableStandingsElement = document.querySelector('table-standings');
    const tableMatchesElement = document.querySelector('table-matches');
    const detailClubElement = document.querySelector('detail-club');
    const clubsSavedElement = document.querySelector('clubs-saved');

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get('saved');
    const idClub = urlParams.get('id');
    
    const onSelectChange = async (e) => {
        const stateSelect = selectLeagueElement.getAttribute('class');
        try {
            // handel onchange select sesuai attribute class
            if(stateSelect === 'select-standings') {
                progressBarElement.setAttribute('style', 'display: block;');
                const idLeague = selectLeagueElement.valueSelect;
                const results = await apiInterface.getStandings(idLeague);
                renderTableStandings(results);
                progressBarElement.setAttribute('style', 'display: none;');
            }
            else {
                onDateChange();
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    if(selectLeagueElement) {
        selectLeagueElement.title = 'select-standings';
        selectLeagueElement.changeEvent = onSelectChange;
    }

    const renderTableStandings = standings => {
        tableStandingsElement.standings = standings;
    };

    const onDateChange = async (e) => {
        try {
            progressBarElement.setAttribute('style', 'display: block;');
            const idLeague = selectLeagueElement.valueSelect;
            const date = dateMathcesElement.valueDate;
            const results = await apiInterface.getMatches(idLeague, date);
            renderTableMatches(results);
            progressBarElement.setAttribute('style', 'display: none;');
        } catch (error) {
            console.log(error);
        }
    };

    if(dateMathcesElement) dateMathcesElement.changeEvent = onDateChange;

    const renderTableMatches = matches => {
        tableMatchesElement.matches = matches;
    };

    const showClubById = async () => {
        progressBarElement.setAttribute('style', 'display: block;');
        try {
            if(isFromSaved === 'true') {
                const club = await apiIndexedDB.getClubById(idClub);
                renderClubById(club);
                detailClubElement.stateFab = true;
            }
            else {
                const club = await apiIndexedDB.getClubById(idClub);
                if(club) {
                    renderClubById(club);
                    detailClubElement.stateFab = true;
                }
                else {
                    const result = await apiInterface.getClubById(idClub);
                    renderClubById(result);
                }
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            progressBarElement.setAttribute('style', 'display: none;');
        }
    };

    const renderClubById = club => {
        detailClubElement.club = club;
    };

    const onClickFab = async (e) => {
        try {
            const stateButton = e.target.innerText;
            
            if(stateButton === 'save') {
                detailClubElement.stateFab = true;
                const club = await apiInterface.getClubById(idClub);
                await apiIndexedDB.saveClub(club);
                
                // menampilkan toast
                M.toast({html: 'Berhasil Disimpan :)', classes: 'rounded valign-wrapper'});
            }
            if(stateButton === 'remove') {
                detailClubElement.stateFab = false;

                await apiIndexedDB.removeClubById(idClub);
  
                // menampilkan toast
                M.toast({html: 'Berhasil Dihapus :)', classes: 'rounded valign-wrapper'});
            }
        } catch (error) {
            console.log(error);
        }
    };

    if(detailClubElement) {
        showClubById();
        detailClubElement.clickEventFab = onClickFab;
    }

    const showClubsSaved = async () => {
        try {
            progressBarElement.setAttribute('style', 'display: block;');
            const clubs = await apiIndexedDB.getAllClubSaved();
            renderClubsSaved(clubs);
            progressBarElement.setAttribute('style', 'display: none;');
        } catch (error) {
            console.log(error);
        }
    };

    const renderClubsSaved = clubs => {
        clubsSavedElement.clubs = clubs;
    };

    const requestPermission = () => {
        if('Notification' in window) {
            Notification.requestPermission()
                .then(result => {
                    if(result === 'denied') {
                        console.log('Fitur notifikasi tidak dizinkan!');
                        return;
                    } else if(result === 'default') {
                        console.error('Pengguna menutup kotak dialog permintaan!');
                        return;
                    }
    
                    navigator.serviceWorker.ready.then(() => {
                        if(('PushManager' in window)) {
                            navigator.serviceWorker.getRegistration()
                                .then(registration => {
                                    registration.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: urlBase64ToUint8Array('BPSnMR4h4cXaFeELtSSpaG5fvphdcepacF082NeFVP25fywZ_rsx8UmgKxnmuqVAABVcU3NINHgWGa37AT79ysU')
                                    })
                                    .then(subscribe => {
                                        console.log(`Berhasil melakukan subcribe dengan endpoint: ${subscribe.endpoint}`);
                                        
                                        console.log(`Berhasil melakukan subcribe dengan p256dh key : ${btoa(String.fromCharCode.apply(
                                            null, new Uint8Array(subscribe.getKey('p256dh'))
                                        ))}`);
        
                                        console.log(`Berhasil melakukan subcribe dengan auth key : ${btoa(String.fromCharCode.apply(
                                            null, new Uint8Array(subscribe.getKey('auth'))
                                        ))}`);
                                        
                                    })
                                    .catch(err => {
                                        console.error(`Tidak dapat melakukan subcribe ${err.message}`);
                                    });

                                    // // unsubcribe
                                    // registration.pushManager.getSubscription().then(pushSub => {
                                    //     pushSub.unsubscribe();
                                    // });
                                });
                        }
                    });
    
            });
        }
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let index = 0; index < rawData.length; index++) {
            outputArray[index] = rawData.charCodeAt(index);
        }
        return outputArray;
    };
    
};

export default main;