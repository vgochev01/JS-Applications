import {html} from '../../node_modules/lit-html/lit-html.js';
import { getMyCars } from '../api/data.js';
import { carTemplate } from './common/carTemplate.js';

const profileTemplate = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${ cars.length > 0 ? cars.map(carTemplate) : html`
        <p class="no-cars"> You haven't listed any cars yet.</p>
        ` }

    </div>
</section>
`;

export async function showProfile(ctx) {
    const userId = sessionStorage.getItem('userId');
    const cars = await getMyCars(userId);
    ctx.render(profileTemplate(cars));
}