import {html} from '../../../node_modules/lit-html/lit-html.js';
import {editMovie, getMovieById} from '../api/data.js';

const editTemplate = (movie, onSubmit, errMsg) => html`
<section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        ${errMsg ? html`<p class="err-msg">${errMsg}</p>` : '' }
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." .value=${movie.description} name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>
`;

export async function showEdit(ctx){
    const movieId = ctx.params.id;
    const movie = await getMovieById(movieId);

    updateView();

    async function onSubmit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('imageUrl');
    
        try {
            if(title == '' || description == '' || img == ''){
                throw new Error('All fields are required!!');
            } 

            const response = await editMovie(movieId, {title, description, img});
            ctx.page.redirect('/details/' + response._id);
        } catch(err) {
            updateView(err.message);
        }
    }

    function updateView(errMsg){
        ctx.render(editTemplate(movie, onSubmit, errMsg));
    }
}