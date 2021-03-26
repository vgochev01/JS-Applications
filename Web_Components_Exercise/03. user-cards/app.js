import { html, render } from '../node_modules/lit-html/lit-html.js';

const cardTemplate = (info, show, toggle) => html`
<style>
    .user-card {
        display: flex;
        font-family: 'Arial', sans-serif;
        background-color: #EEE;
        border-bottom: 5px solid darkorchid;
        width: 100%;
    }

    .user-card img {
        width: 200px;
        height: 200px;
        border: 1px solid darkorchid;
    }

    .info {
        display: flex;
        flex-direction: column;
    }

    .info h3 {
        font-weight: bold;
        margin-top: 1em;
        text-align: center;
    }

    .info button {
        outline: none;
        border: none;
        cursor: pointer;
        background-color: darkorchid;
        color: white;
        padding: 0.5em 1em;
    }

    @media only screen and (max-width: 500px) {
        .user-card {
            flex-direction: column;
            margin-bottom: 1em;
        }

        .user-card figure,
        .info button {
            align-self: center;
        }

        .info button {
            margin-bottom: 1em;
        }

        .info p {
            padding-left: 1em;
        }
    }
</style>
<div class="user-card">
    <figure>
        <img src=${info.avatar} />
    </figure>
    <div class="info">
        <h3>${info.name}</h3>
        ${show ? html`
        <div>
            <p>
                ${info.email}
            </p>
            <p>
                ${info.phone}
            </p>
        </div>` : ''}
        <button @click=${toggle} class="toggle-info-btn">Toggle Info</button>
    </div>
</div>
`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.info = {
            name: this.getAttribute('name'),
            avatar: this.getAttribute('avatar'),
            email: this.getAttribute('email'),
            phone: this.getAttribute('phone')
        }
        this.show = false;
    }

    connectedCallback(){
        this.update()
    }

    update() {
        render(cardTemplate(this.info, this.show, this.toggle), this.shadowRoot, { eventContext: this });
    }

    toggle(ev) {
        this.show = !this.show;
        this.update();
    }
}

window.customElements.define('user-card', UserCard);