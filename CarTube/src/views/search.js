import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchByYear } from '../api/data.js';
import { carTemplate } from './common/carTemplate.js';

const searchTemplate = (search, cars) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${search} class="button-list">Search</button>
    </div>

    ${cars != undefined ? html `
    <h2>Results:</h2>
    <div class="listings">
        ${cars.length > 0 ? cars.map(carTemplate) : html`
        <p class="no-cars"> No results.</p>
        ` }
    </div>
    ` : ''}

</section>
`;

export async function showSearch(ctx){

    updateView();

    async function search(ev) {
        const input = ev.target.parentNode.querySelector('input[name="search"]');
        const year = Number(input.value);
        if(input.value != '' && !isNaN(year)){
            const cars = await searchByYear(year);
            updateView(cars);
            input.value = '';
        }
    }

    function updateView(cars){
        ctx.render(searchTemplate(search, cars));
    }
}