class DateMatches extends HTMLElement {
    constructor() {
        super();
    }

    set changeEvent(event) {
        this._changeEvent = event;
        this.render();
    }

    get valueDate() {
        return this.querySelector('#datepicker').value;
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <div class="col s12 m12 l12">
                <input type="text" class="datepicker" id="datepicker" placeholder="Tanggal">
            </div>
        </div>
        `;

        this.querySelector('#datepicker').addEventListener('change', this._changeEvent);
    }
}

customElements.define('date-matches', DateMatches);