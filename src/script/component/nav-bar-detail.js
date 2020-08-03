import logo from '../../assets/img/icon-128x128.png';

class NavBarDetail extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav class="#66bb6a green lighten-1" role="navigation">
                <div class="nav-wrapper container">
                    <a href="javascript:history.back()" class="brand-logo center flow-text" id="logo-container">
                        <img src="${logo}" width="23px" alt="Logo"> Bola
                    </a>

                    <a href="javascript:history.back()">
                        <i class="material-icons">arrow_back</i>
                    </a>
                </div>
            </nav>
        `;
    }
}

customElements.define('nav-bar-detail', NavBarDetail);