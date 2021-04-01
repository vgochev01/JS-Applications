import {html} from '../../node_modules/lit-html/lit-html.js';
import { getCars } from '../api/data.js';
import { carTemplate } from './common/carTemplate.js';

const catalogTemplate = (cars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
    ${ cars.length > 0 ? html`
        ${cars.map(carTemplate)}
        ` : html`<p class="no-cars">No cars in database.</p>` }
    </div>
</section>
`;

export async function showCatalog(ctx) {
    const cars = await getCars();
    ctx.render(catalogTemplate(cars));
}