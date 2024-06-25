async function autoComplete(root, key){
    if(key.target.value.length > 0){
        try{
                const dropdown = document.createElement("div");
                const rootClass = `.${root.getAttribute("class")}`;
                dropdown.classList.add("search-dropdown");
                //     width: 25rem;
                //     height: 15rem;
                //     display: none;
                //     flex-direction: column;
                dropdown.innerHTML = '';
                dropdown.style.display = "flex";
                if(document.querySelector(`${rootClass}`).contains(document.querySelector(`${rootClass} .movie_info_wrapper`))){
                    document.querySelector(`${rootClass} .movie_info_wrapper`).style.display = "none";
                }
                root.append(dropdown);
                const response = await getMovies(key.target.value);
                for(let movie of response){
                    const div = document.createElement("div");
                    const imageSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
                    div.classList.add("search-dropdown-item");
                    //         flex-basis: 33%;
                    //         display: flex;
                    //         width: 100%;
                    //         border: 2px solid rebeccapurple;
                    //         background-color: darkslategray;
                    //         transition: all .2s;

                    div.innerHTML = `
                        <img src="${imageSRC}" height="80" alt="img">
                        <p>${await movie.Title} (${await movie.Year})</p>
                    `

                    div.addEventListener("click", async (e) => {
                        document.querySelector(`${rootClass} .search-dropdown`).remove();
                        input1.value = "";
                        if(document.querySelector(`${rootClass}`).contains(document.querySelector(`${rootClass} .movie_info_wrapper`))){
                            document.querySelector(`${rootClass} .movie_info_wrapper`).remove();
                        }
                        // await movieInfo(getMovieInfo(movie.imdbID));
                        document.querySelector(`${rootClass}`).append(await movieInfo(getMovieInfo(movie.imdbID)));
                    })

                    dropdown.append(div);

                }
        }catch (e) {
            if(document.querySelector(`.${root.className}`).contains(document.querySelector(`.${root.className} .search-dropdown`))){
                document.querySelector(`.${root.className} .search-dropdown`).remove();
            }
            console.error(e.message);
        }
    }else{
        document.querySelector(`.${root.className} .search-dropdown`).style.display = "none";
    }
}