import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteShoe, editShoe, getShoeById } from '../api/data.js';

const detailsTemplate = (shoe, info) => html`
<div class="offer-details">
    <h1>${shoe.brand} ${shoe.name}</h1>
    <div class="info">
        <img src=${shoe.imageUrl} alt="">
        <div class="description">${shoe.description}
            <br>
            <br>
            <p class="price">$${shoe.price}</p>
        </div>
    </div>
    <div class="actions">
        ${info.isOwner ? html`
            <a href="/edit/${shoe._id}">Edit</a>
            <a @click=${info.deleteOffer} href="javascript:void(0)">Delete</a>
        ` : !info.hasBought ? html`
            <a @click=${info.buyOffer} href="javascript:void(0)">Buy</a>
        ` : html`
            <span>You bought it</span>
        `}
    </div>
</div>
`;


export async function showDetails(ctx){
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const shoe = await getShoeById(id);

    updateView();

    function updateView(){
        const info = {
            isOwner: userId == shoe._ownerId,
            hasBought: shoe.peopleBought.includes(userId),
            deleteOffer,
            buyOffer
        }
        console.log('isOwner ', info.isOwner);
        console.log('userBought', info.hasBought);
        ctx.render(detailsTemplate(shoe, info));
    }

    async function buyOffer() {
        //shoe.peopleBought.push(userId);
        //await editShoe(id, shoe);
        //updateView();
        alert('Functionality to be added soon!')
    }

    async function deleteOffer(){
        const confirmation = confirm("Are you sure want to delete this offer?");
        if(confirmation){
            await deleteShoe(id);
            ctx.page.redirect('/');
        }
    }
}