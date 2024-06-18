console.info("COMPARE MOVIES!");
const input1 = document.querySelector("#search1");
input1.value = "";


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

                div.addEventListener("click", (e) => {
                    document.querySelector(".first-search-dropdown").style.display = "none";
                    input1.value = movie.Title;
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