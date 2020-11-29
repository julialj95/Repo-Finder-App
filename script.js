function watchForSubmit(){
    $('form').submit(event => {
      event.preventDefault();
      const username = $("#js-search-term").val()
      console.log(username) 
      getResults(username);
    })
}

function getResults(username){
    let searchUrl = `https://api.github.com/users/${username}/repos`
    console.log(searchUrl)
    const options = {
        header: new Headers({
            "accept": 'application/vnd.github.v3+json'})
    }


    fetch(searchUrl, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))

}
$(watchForSubmit)

function displayResults(responseJson){
    $("#results-list").empty()
    for (let i = 0; i < responseJson.length; i++){
        $("#results-list").append(`<li><h3>${responseJson[i].name}</h3><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`)
    }
    $("#results").removeClass('hidden')
}