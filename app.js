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
    const genres = document.createElement("h3");
    genres.innerText = `${await movie.Genre}`;
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

    const awards = document.createElement("p");
    if(movie.Awards === "N/A"){
        awards.innerText = "This film have got no awards.";
    }else{
        awards.innerText = `${movie.Awards}`;    awards.style.fontStyle = "italic";
        awards.style.color = "gold";
        awards.style.textDecoration = "underline";
        awards.style.textShadow = "1px 1px 12px gold";
        awards.style.marginTop = "4.5rem";
    }



    const ratings = document.createElement("div");
    ratings.classList.add("ratings");
    //imdb
    const imdb = document.createElement("div");
    const imdbImg = document.createElement("img");
    const imdbRating = document.createElement("span");
    imdbRating.innerText = `${movie.imdbRating}`
    imdbImg.src = "https://static-00.iconduck.com/assets.00/imdb-icon-2048x2048-e3h400jc.png";
    imdbImg.addEventListener("click", () => {
        window.open(`https://www.imdb.com/title/${movie.imdbID}/`, "_blank")
    })
    imdbImg.style.cursor = "pointer";
    imdbImg.setAttribute("width", "25");
    imdbImg.setAttribute("alt", "poster");
    imdb.append(imdbImg, imdbRating);
    imdb.style.marginRight = "0.5rem";
    //imdb

    // metacritic
    const metaCritic = document.createElement("div");
    const metaCriticImg = document.createElement("img");
    const metaCriticRating = document.createElement("span");
    metaCriticRating.innerText = `${movie.Metascore}`;
    if(metaCriticRating.innerText !== "N/A"){
        if(parseInt(metaCriticRating.innerText) > 75){
            metaCriticRating.style.backgroundColor = "green";
            metaCriticRating.style.color = "white";
        }
        else if(parseInt(metaCriticRating.innerText) > 50 && parseInt(metaCriticRating.innerText) < 75){
            metaCriticRating.style.backgroundColor = "orange";
            metaCriticRating.style.color = "white";
        }
        else{
            metaCriticRating.style.backgroundColor = "red";
            metaCriticRating.style.color = "white";
        }
    }else{
        metaCriticRating.innerText = "No data";
    }

    metaCriticImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Metacritic_logo_original.svg/1200px-Metacritic_logo_original.svg.png";
    metaCriticImg.addEventListener("click", () => {
        window.open(`https://www.metacritic.com/search/${movie.Title}/`, "_blank");
    })
    metaCriticImg.style.cursor = "pointer";
    metaCriticImg.setAttribute("width", "25");
    metaCriticImg.setAttribute("alt", "poster");
    metaCritic.append(metaCriticImg, metaCriticRating);
    //metaCritic
    ratings.append(imdb, metaCritic)


    wrapper.append(poster);
    descriptionWrapper.append(title);
    descriptionWrapper.append(genres);
    descriptionWrapper.append(description);
    descriptionWrapper.append(awards);
    descriptionWrapper.append(ratings);
    wrapper.append(descriptionWrapper);
    document.querySelector(".first-search").appendChild(wrapper);
}


input1.addEventListener("input", debounce(async(k) => {
    if(k.target.value.length > 0){
        try{
            const dropdown = document.querySelector(".first-search-dropdown")
            dropdown.innerHTML = '';
            dropdown.style.display = "flex";
            if(document.querySelector(".first-search").contains(document.querySelector(".movie_info_wrapper"))){
                document.querySelector(".movie_info_wrapper").style.display = "none";
            }
            const response = await getMovies(k.target.value);
            for(let movie of response){
                const div = document.createElement("div");
                const imageSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
                div.classList.add("first-search-dropdown-item");

                div.innerHTML = `
                    <img src="${imageSRC}" height="80" alt="img">
                    <p>${await movie.Title} (${await movie.Year})</p>
                `

                div.addEventListener("click", async (e) => {
                    document.querySelector(".first-search-dropdown").style.display = "none";
                    input1.value = "";
                    if(document.querySelector(".first-search").contains(document.querySelector(".movie_info_wrapper"))){
                        document.querySelector(".first-search .movie_info_wrapper").remove();
                    }
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
        document.querySelector(".first-search .movie_info_wrapper").style.display = "flex";
    }
})