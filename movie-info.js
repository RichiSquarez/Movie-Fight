const getMovies = async (search) =>{
    try{
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "309ca981",
                s: search,
                type: "movie"
            }
        });
        return [await response.data.Search[0], await response.data.Search[1], await response.data.Search[2]];
    }catch (e) {
        console.error(e.message);
    }
}

const getMovieInfo = async (id) => {
    try{
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "309ca981",
                i: id
            }
        })
        console.log(await response.data);
    }catch (e) {
        console.error(e.message);
    }
}