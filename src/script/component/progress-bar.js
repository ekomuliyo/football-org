class ProgressBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `    
        <div class="preloader-wrapper small active" id="progress-bar" style="position: fixed; top: 50%; left: 50%; z-index: 10060 !important;">
            <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>`;
    }
}

customElements.define('progress-bar', ProgressBar);