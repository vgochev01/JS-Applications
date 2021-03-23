import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getMovieById, deleteMovie, addLike, getLikes, checkUserLiked} from '../api/data.js';

const detailsTemplate = (movie, likeMovie, deleteHandler, info) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>

                ${ info.isOwner ? html`
                <a @click=${(ev) => deleteHandler(ev, movie._id)} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>
                ` : '' }
                ${!info.hasLiked && !info.isOwner? html`
                <a @click=${likeMovie} class="btn btn-primary" href="javascript:void(0)">Like</a>
                ` : '' }

                <span class="enrolled-span">Liked ${info.likesCount}</span>
            </div>
        </div>
    </div>
</section>
`;

export async function showDetails(ctx){
    const movieId = ctx.params.id;
    const movie = await getMovieById(movieId);

    const userId = sessionStorage.getItem('userId');
    const isOwner = userId == movie._ownerId;

    updateView();

    async function updateView(){
        const hasLiked = await checkUserLiked(movieId);
        const likesCount = await getLikes(movieId);
        const info = {isOwner, hasLiked, likesCount};
        ctx.render(detailsTemplate(movie, likeMovie, deleteHandler, info));
    }

    async function likeMovie(ev) {
        ev.preventDefault();
        await addLike(movieId);
        updateView()
    }

    async function deleteHandler(ev, id){
        ev.preventDefault();
        const confirmation = confirm('Are you sure want to delete this movie?');
        if(confirmation){
            await deleteMovie(id);
            ctx.page.redirect('/home');
        }
    }
}
