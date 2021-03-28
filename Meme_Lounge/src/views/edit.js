import { html } from '/node_modules/lit-html/lit-html.js';
import { getMemeById, editMeme } from '/src/api/data.js';
import { notify } from '../common/notification.js';

const editTemplate = (meme, onSubmit, errMsg) => html`
${errMsg ? notify(errMsg) : ''}
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" .value=${meme.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" .value=${meme.description} name="description">
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" .value=${meme.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);

    updateView();

    function updateView(errMsg) {
        ctx.render(editTemplate(meme, onSubmit, errMsg));
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

            await editMeme(id, {title, description, imageUrl});
            ctx.page.redirect('/details/' + id);
        } catch (err) {
            updateView(err.message);
            setTimeout(() => updateView(), 3000);
        }
    }
}