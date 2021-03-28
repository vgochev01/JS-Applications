import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../api/data.js';
import { notify } from '../common/notification.js';

const createTemplate = (onSubmit, errMsg) => html`
${errMsg ? notify(errMsg) : ''}
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`;


export async function showCreate(ctx) {
    
    updateView();

    function updateView(errMsg) {
        ctx.render(createTemplate(onSubmit, errMsg));
    }

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        const entries = [...formData.entries()];

        try {
            if(entries.some(([k, v]) => v == '')){
                throw new Error('All fields are required!');
            }

            await createMeme({title, description, imageUrl});
            ctx.page.redirect('/memes');
        } catch (err) {
            updateView(err.message);
            setTimeout(() => updateView(), 3000);
        }
    }
}