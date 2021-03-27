import { html } from '/node_modules/lit-html/lit-html.js';
import { deleteMeme, getMemeById } from '/src/api/data.js';

const memeTemplate = (meme, info) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
            ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${info.isOwner ? html `
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${info.onDelete} class="button danger">Delete</button>
            ` : ''}
        </div>
    </div>
</section>
`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const meme = await getMemeById(id);
    const info = {
        isOwner: meme._ownerId == userId,
        onDelete
    }
    ctx.render(memeTemplate(meme, info));

    async function onDelete() {
        const confirmation = confirm('Are you sure want to delete this meme?');
        if(confirmation){
            await deleteMeme(meme._id);
            ctx.page.redirect('/memes');
        }
    }
}