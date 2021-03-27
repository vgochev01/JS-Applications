import { html } from '/node_modules/lit-html/lit-html.js';
import { getMemeById, editMeme } from '/src/api/data.js';

const editTemplate = (meme, onSubmit) => html`
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

    ctx.render(editTemplate(meme, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        const entries = [...formData.entries()];
        if(entries.some(([k, v]) => v == '')){
            return alert('All fields are required!');
        }

        await editMeme(id, {title, description, imageUrl});
        ctx.page.redirect('/details/' + id);
    }
}