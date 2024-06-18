console.info("COMPARE MOVIES!");
const input1 = document.querySelector("#search1");
input1.value = "";


input1.addEventListener("input", debounce(async(k) => {
    if(k.target.value.length > 0){
        try{
            const dropdown = document.querySelector(".first-search-dropdown")

            const response = await getMovies(k.target.value);
            dropdown.style.display = "flex";
            for(let movie of response){
                const div = document.createElement("div");
                div.classList.add("first-search-dropdown-item");

                div.innerHTML = `
                    <img src="${await movie.Poster}" height="80">
                    <p>${await movie.Title} (${await movie.Year})</p>
                `

                document.querySelector(".first-search-dropdown").append(div);

            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
}));


