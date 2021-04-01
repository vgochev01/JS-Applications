import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteCar, getCarById } from '../api/data.js';

const detailsTemplate = (car, info) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${info.isOwner ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${info.onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>
        ` : ''}
    </div>
</section>
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const car = await getCarById(id);
    const userId = sessionStorage.getItem('userId');
    const info = {
        isOwner: car._ownerId == userId,
        onDelete
    }
    ctx.render(detailsTemplate(car, info));

    async function onDelete(ev) {
        ev.preventDefault();
        const confirmation = confirm('Are you sure want to delete this listing?');
        if (confirmation) {
            await deleteCar(id);
            ctx.page.redirect('/catalog');
        }
    }
}