console.info("COMPARE MOVIES!");


const input1 = document.querySelector("#search1");


input1.addEventListener("input", debounce(async(k) => {
    if(k.target.value.length > 0){
        try{
            const dropdown = document.querySelector(".first-search-dropdown")
            const response = await getMovies(k.target.value);
            const fullInfo = await getMovieInfo(response[0].imdbID)
            dropdown.style.display = "flex";
            console.log(response)
        }catch (e) {
            console.error(e.message);
        }
    }
}));