import {html} from '../../node_modules/lit-html/lit-html.js';
import { editCar, getCarById } from '../api/data.js';

const editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const car = await getCarById(id);
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const entries = [...formData.entries()];
        if(entries.some(([k, v]) => v == '')){
            return alert('All fields are required!');
        }

        const data = entries.reduce((acc, [k, v]) => {
            if(k == 'year' || k == 'price'){
                v = Number(v);
            }
            acc[k] = v;
            return acc;
        }, {})

        await editCar(id, data);
        ctx.page.redirect(`/details/${id}`);
    }
}