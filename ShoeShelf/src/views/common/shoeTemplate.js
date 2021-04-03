import { html } from '../../../node_modules/lit-html/lit-html.js';

export const shoeTemplate = (shoe) => html`
<div class="shoe">
    <img src=${shoe.imageUrl}>
    <h3>${shoe.brand} ${shoe.name}</h3>
    <a href="/details/${shoe._id}">Buy it for $${shoe.price}</a>
</div>
`;