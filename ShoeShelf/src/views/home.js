import { html } from '../../node_modules/lit-html/lit-html.js';
import { getShoes } from '../api/data.js';
import { shoeTemplate } from './common/shoeTemplate.js';

const guestTemplate = () => html`
<div class="container">
<div class="about-us">
    <div>
        <img src="../public/shoes.jpg" alt="">
        <img src="../public/shoes2.jpg" alt="">
    </div>
    <p>
        <a href="/register">Register Now</a> and Try it!
    </p>
</div>
</div>
`;

const userTemplate = (shoes) => html`
<div class="shoes">
    ${shoes.length > 0 ? 
    shoes.map(shoeTemplate) 
    : html`
        <h1>No shoes to display. Be the first to create a new offer..</h1>
    `}
</div>
`;

export async function showHome(ctx) {
    const userId = sessionStorage.getItem('userId');
    const shoes = await getShoes();
    if(userId != null){
        ctx.render(userTemplate(shoes));
    } else {
        ctx.render(guestTemplate());
    }
}