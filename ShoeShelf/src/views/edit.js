import { html } from '../../node_modules/lit-html/lit-html.js';
import { editShoe, getShoeById } from '../api/data.js';

const editTemplate = (shoe, onSubmit, errMsg = '') => html`
<h1>Edit Offer</h1>
<p class="message">${errMsg}</p>
<form @submit=${onSubmit}>
    <div>
        <input type="text" name="name" .value=${shoe.name} placeholder="Name...">
    </div>
    <div>
        <input type="text" name="price" .value=${shoe.price} placeholder="Price...">
    </div>
    <div>
        <input type="text" name="imageUrl" .value=${shoe.imageUrl} placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" .value=${shoe.description} placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" .value=${shoe.brand} placeholder="Brand...">
    </div>
    <div>
        <button>Edit</button>
    </div>
</form>
`;


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const shoe = await getShoeById(id);

    updateView();

    function updateView(errMsg){
        ctx.render(editTemplate(shoe, onSubmit, errMsg));
    }

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const entries = [...formData.entries()];

        if(entries.some(([k,v]) => v == '')){
            return updateView("All fields are required!");
        }

        let data = entries.reduce((acc, [k, v]) => {
            if(k == 'price') {
                v = Number(v);
            }
            acc[k] = v;
            return acc;
        }, {});

        data['peopleBought'] = shoe.peopleBought;

        const result = await editShoe(id, data);
        ctx.page.redirect('/details/' + result._id);
    }
}