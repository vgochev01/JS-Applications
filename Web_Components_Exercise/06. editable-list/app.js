import {html, render} from '../node_modules/lit-html/lit-html.js';

const itemTemplate = (text, remove) => html`
<li>
    <p class="editable-list-item-value">${text}</p>
    <button @click=${remove} class="editable-list-remove-item icon">
        &ominus;
    </button>
</li>
`;

const listTemplate = (items, addItem, removeItem) => html`
<style>
    .container {
        max-width: 500px;
        margin: 50px auto;
        border-radius: 20px;
        border: solid 8px #2c3033;
        background: white;
        box-shadow: 0 0 0px 1px rgba(255, 255, 255, .4), 0 0 0px 3px #2c3033;
    }

    .editable-list-header {
        margin: 0;
        border-radius: 10px 10px 0 0px;
        background-image: linear-gradient(#687480 0%, #3b4755 100%);
        font: bold 18px/50px arial;
        text-align: center;
        color: white;
        box-shadow: inset 0 -2px 3px 2px rgba(0, 0, 0, .4), 0 2px 2px 2px rgba(0, 0, 0, .4);
    }

    .editable-list {
        padding-left: 0;
    }

    .editable-list>li,
    .editable-list-add-container {
        display: flex;
        align-items: center;
    }

    .editable-list>li {
        justify-content: space-between;
        padding: 0 1em;
    }

    .editable-list-add-container {
        justify-content: space-evenly;
    }

    .editable-list>li:nth-child(odd) {
        background-color: rgb(229, 229, 234);
    }

    .editable-list>li:nth-child(even) {
        background-color: rgb(255, 255, 255);
    }

    .editable-list-add-container>label {
        font-weight: bold;
        text-transform: uppercase;
    }

    .icon {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.8rem;
        outline: none;
    }
</style>
<article class="container">
    <h1 class="editable-list-header">TODO LIST TITLE</h1>

    <ul class="editable-list">
        ${items.map(item => itemTemplate(item, removeItem))}
    </ul>

    <div class="editable-list-add-container">
        <label>ADD NEW TODO</label>
        <input id="newItemText" class="add-new-list-item-input" type="text">
        <button @click=${addItem} class="editable-list-add-item icon">&oplus;</button>
    </div>
</article>
`;

class EditableList extends HTMLElement {
    constructor() {
        super();
        this.items = [];
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.update();
    }

    update() {
        render(listTemplate(this.items, this.addItem, this.removeItem), this.shadowRoot, {eventContext: this});
    }

    addItem(ev) {
       const input = ev.target.parentNode.querySelector('input');
       if(input.value != ''){
            this.items.push(input.value);
            input.value = '';
            this.update();
        } else {
            alert('Please fill the requied field!');
        }
    }

    removeItem(ev) {
        const itemText = ev.target.parentNode.querySelector('p');
        const index = this.items.indexOf(itemText.textContent);
        this.items.splice(index, 1);
        this.update();
    }
}

window.customElements.define('editable-list', EditableList);