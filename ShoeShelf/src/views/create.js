import { html } from '../../node_modules/lit-html/lit-html.js';
import { createShoe } from '../api/data.js';

const createTemplate = (onSubmit, errMsg = '') => html`
<h1>Create New Offer</h1>
<p class="message">${errMsg}</p>
<form @submit=${onSubmit}>
    <div>
        <input type="text" name="name" placeholder="Name...">
    </div>
    <div>
        <input type="text" name="price" placeholder="Price...">
    </div>
    <div>
        <input type="text" name="imageUrl" placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" placeholder="Brand...">
    </div>
    <div>
        <button>Create</button>
    </div>
</form>
`;


export async function showCreate(ctx) {

    updateView();

    function updateView(errMsg){
        ctx.render(createTemplate(onSubmit, errMsg));
    }

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const entries = [...formData.entries()];

        if(entries.some(([k,v]) => v == '')){
            return updateView("All fields are required!");
        }

        const data = entries.reduce((acc, [k, v]) => {
            if(k == 'price') {
                v = Number(v);
            }
            acc[k] = v;
            return acc;
        }, {});

        data['peopleBought'] = [];

        const result = await createShoe(data);
        ctx.page.redirect('/details/' + result._id);
    }
}