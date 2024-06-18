// Debounce function which helps to prevent some issues with api

const debounce = (callback, delay = 500) =>{
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    }
}
