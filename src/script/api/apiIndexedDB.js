import { openDB } from 'idb';

class ApiIndexedDB {
    
    constructor() {
        this.dbPromise = openDB('db-football', 1, {
            upgrade(db) {
                const dbObjectStore =  db.createObjectStore('club-football', { keyPath: 'id'});
                dbObjectStore.createIndex('name', 'name', { unique: false });
            }
        });
    }

    saveClub(club) {
        this.dbPromise.then(db => {
            const tx = db.transaction('club-football', 'readwrite');
            const store = tx.objectStore('club-football');
            store.put(club);
            return tx.done;
        })
        .then(() => console.log('berhasil disimpan'))
        .catch(error => console.log(error));
    }

    removeClubById(idClub) {
        this.dbPromise.then(db => {
            const tx = db.transaction('club-football', 'readwrite');
            const store = tx.objectStore('club-football');
            store.delete(parseInt(idClub));
            return tx.done;
        })
        .then(() => console.log('berhasil dihapus'))
        .catch(error => console.log(error));
    }
    
    getAllClubSaved() {
        return new Promise((resolve, reject) => {
            this.dbPromise.then(db => {
                const tx = db.transaction('club-football', 'readonly');
                const store = tx.objectStore('club-football');
                return store.getAll();
            })
            .then(clubs => resolve(clubs))
            .catch(error => reject(error));
        });
    }

    getClubById(idClub) {
        return new Promise((resolve, reject) => {
            this.dbPromise.then(db => {
                const tx = db.transaction('club-football', 'readonly');
                const store = tx.objectStore('club-football');
                return store.get(parseInt(idClub));
            })
            .then(club => resolve(club))
            .catch(error => reject(error));
        });
    }
}

export default ApiIndexedDB;