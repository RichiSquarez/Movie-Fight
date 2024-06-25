console.info("COMPARE MOVIES!");
const input1 = document.querySelector("#search1");
const input2 = document.querySelector("#search2");
const inputType = document.querySelector(".type-container-select");
input1.value = "";
input2.value = "";

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
    const boxOffice = document.createElement("p");
    if(movie.BoxOffice === "N/A" || !movie.BoxOffice){
        boxOffice.innerText = `No info about box office - ${movie.Country}`;
    }else{
        boxOffice.innerText = `${movie.BoxOffice} - ${movie.Country}`;
    }
    boxOffice.classList.add("description");

    const awards = document.createElement("p");
    if(movie.Awards === "N/A"){
        awards.style.marginTop = "4.5rem";
        awards.innerText = "This film have got no awards.";
        awards.style.position = "absolute";
        awards.style.bottom = "0%";
    }else{
        awards.innerText = `${movie.Awards}`;
        awards.style.fontStyle = "italic";
        awards.style.color = "gold";
        awards.style.textDecoration = "underline";
        awards.style.textShadow = "1px 1px 12px gold";
        awards.style.marginTop = "4.5rem";
        awards.style.position = "absolute";
        awards.style.bottom = "0%";
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
    descriptionWrapper.append(boxOffice);
    descriptionWrapper.append(awards);
    descriptionWrapper.append(ratings);
    wrapper.append(descriptionWrapper);
    return wrapper;
}


input1.addEventListener("input", debounce(async (k) => {
    await autoComplete(document.querySelector(".first-search"),[getMovies, getMovieInfo], (suggest) =>{
        const imageSRC = suggest.Poster === 'N/A' ? '' : suggest.Poster;
        return `
                        <img src="${imageSRC}" height="80" alt="img">
                        <p>${suggest.Title} (${suggest.Year})</p>
                    `
    }, k)
}));

input2.addEventListener("input", debounce(async (k) => {
    await autoComplete(document.querySelector(".second-search"), [getMovies, getMovieInfo], (suggest) =>{
        const imageSRC = suggest.Poster === 'N/A' ? '' : suggest.Poster;
        return `
                        <img src="${imageSRC}" height="80" alt="img">
                        <p>${suggest.Title} (${suggest.Year})</p>
                    `
    }, k)
}))



document.addEventListener("click", (e) => {
    if(!document.querySelector(".first-search .search-dropdown").contains(e.target)){
        document.querySelector(".first-search .search-dropdown").style.display = 'none';
        document.querySelector(".first-search .movie_info_wrapper").style.display = "flex";
    }
    if(!document.querySelector(".second-search .search-dropdown").contains(e.target)){
        document.querySelector(".second-search .search-dropdown").style.display = 'none';
        document.querySelector(".second-search .movie_info_wrapper").style.display = "flex";
    }

    // const searchDropdowns = document.querySelectorAll(".search-dropdown");
    // document.addEventListener("click", (e) => {
    //     for(let i = 0; i < searchDropdowns.length; i++){
    //         if(!searchDropdowns[i].contains(e.target)){
    //             searchDropdowns[i].style.display = "none";
    //             const searchClass = searchDropdowns[i].parentElement.className;
    //             document.querySelector(`.${searchClass} .movie_info_wrapper`).style.display = "flex";
    //         }
    //     }
    // })
})