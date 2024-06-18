console.info("COMPARE MOVIES!");

async function getMovies(){
    try{
        const api = "http://www.omdbapi.com/?apikey=309ca981&s=Blade";
        const response = await axios.get(api);
        await console.log(response.data.Search[0]);
    }catch (e) {
        console.error(e.message);
    }
}


