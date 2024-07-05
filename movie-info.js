const getMovies = async (search, type) =>{
    try{
        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                apikey: "309ca981",
                s: search,
                type: type
            }
        });
        return [await response.data.Search[0], await response.data.Search[1], await response.data.Search[2]];
    }catch (e) {
        console.error(e.message);
    }
}

const getMovieInfo = async (id) => {
    try{
        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                apikey: "309ca981",
                i: id
            }
        })
        return response.data;
        // console.log(await response.data);
    }catch (e) {
        console.error(e.message);
    }
}