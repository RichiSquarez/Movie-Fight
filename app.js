console.info("COMPARE MOVIES!");
const input1 = document.querySelector("#search1");
input1.value = "";

async function movieInfo (m){
    const movie = await m;
    console.log(movie)
    const wrapper = document.createElement("div");
    wrapper.classList.add("movie_info_wrapper");
    const title = document.createElement("h2");
    title.innerText = `${await movie.Title} (${await movie.Year})`;
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("description_wrapper");
    const poster = document.createElement("img");
    poster.src = `${movie.Poster}`;
    poster.setAttribute("height", "215");
    poster.style.marginLeft = "5px";
    poster.style.marginRight = "5px";
    const description = document.createElement("p");
    description.innerText = `${movie.Plot}`;
    description.classList.add("description");
    descriptionWrapper.append(poster);
    descriptionWrapper.append(description);

    const ratings = document.createElement("div");
    ratings.classList.add("ratings");
    //imdb
    const imdb = document.createElement("div");
    const imdbImg = document.createElement("img");
    const imdbRating = document.createElement("span");
    imdbRating.innerText = `${movie.imdbRating}`
    imdbImg.src = "https://static-00.iconduck.com/assets.00/imdb-icon-2048x2048-e3h400jc.png";
    imdbImg.setAttribute("width", "25");
    imdb.append(imdbImg, imdbRating);
    imdb.style.marginRight = "0.5rem";
    //imdb

    // metacritic
    const metaCritic = document.createElement("div");
    const metaCriticImg = document.createElement("img");
    const metaCriticRating = document.createElement("span");
    metaCriticRating.innerText = `${movie.Metascore}`;
    if(parseInt(metaCriticRating.innerText) > 50){
        metaCriticRating.style.backgroundColor = "green";
        metaCriticRating.style.color = "white";
    }else{
        metaCriticRating.style.backgroundColor = "red";
        metaCriticRating.style.color = "white";
    }
    metaCriticImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Metacritic_logo_original.svg/1200px-Metacritic_logo_original.svg.png";
    metaCriticImg.setAttribute("width", "25");
    metaCritic.append(metaCriticImg, metaCriticRating);
    //metaCritic
    ratings.append(imdb, metaCritic)


    wrapper.append(title);
    wrapper.append(descriptionWrapper);
    wrapper.append(ratings);
    document.querySelector(".first-search").appendChild(wrapper);
}


input1.addEventListener("input", debounce(async(k) => {
    if(k.target.value.length > 0){
        try{
            const dropdown = document.querySelector(".first-search-dropdown")
            dropdown.innerHTML = '';
            dropdown.style.display = "flex";
            const response = await getMovies(k.target.value);

            for(let movie of response){
                const div = document.createElement("div");
                const imageSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
                div.classList.add("first-search-dropdown-item");

                div.innerHTML = `
                    <img src="${imageSRC}" height="80">
                    <p>${await movie.Title} (${await movie.Year})</p>
                `

                div.addEventListener("click", async (e) => {
                    document.querySelector(".first-search-dropdown").style.display = "none";
                    input1.value = "";
                    await movieInfo(getMovieInfo(movie.imdbID));
                })

                dropdown.append(div);

            }
        }
        catch (e) {
            console.error(e.message);
        }
    }else{
        document.querySelector(".first-search-dropdown").style.display = "none";
    }
}));

document.addEventListener("click", (e) => {
    if(!document.querySelector(".first-search-dropdown").contains(e.target)){
        document.querySelector(".first-search-dropdown").style.display = 'none';
    }
})