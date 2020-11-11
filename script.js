function clearSite() {
    document.getElementById('videoo').innerHTML = '';
    document.getElementById('listitem').innerHTML = '';
    document.getElementById('reddit').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}

function moviesearch() {
    if (document.getElementById("movinput").value.length == 0) {
        document.getElementById("listitem").innerHTML = `<h1 class="input-error" "><strong style="color:white">Empty Input!</strong> Your movie is being made.</h1>`;
        return;
    }
    document.getElementById('loader1').classList.add('loader');
    let movie = document.getElementById('movinput').value;
    document.getElementById('movinput').value = '';
    const xhr = new XMLHttpRequest();
    let url = `https://www.omdbapi.com/?s=${movie}&apikey=33294efb`;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        document.getElementById('loader1').classList.remove('loader');
        document.getElementById('listitem').innerHTML = ``;
        // document.getElementById('content').innerHTML = '';
        let list = '';
        try {
            let data = xhr.response;
            console.log(data);
            for (let i = 0; i < data.Search.length; i++) {
                if (data.Search[i].Poster === "N/A") {
                    continue;
                }

                list = list + `<div class="content-search" onclick="getmovie('${data.Search[i].imdbID}','${data.Search[i].Title}')"><img class="list-image" src="${data.Search[i].Poster}" alt=""><div class="middle"><div class="list-text">${data.Search[i].Title}<br>(${data.Search[i].Year})</div></div></div>`;
            }
        }
        catch {
            list = `<h1 class="input-error"><i class="fa fa-exclamation-circle"></i>&nbsp;<strong style="color:white">Unsuccessful!</strong>&nbsp;&nbsp;${xhr.response["Error"]}</h1>`;
        }
        document.getElementById('listitem').innerHTML = list;
    }
    xhr.send();
}

function getmovie(imdbtitle, titlemovie) {
    document.getElementById('listitem').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('loader').classList.add('loader');
    let url = `https://www.omdbapi.com/?i=${imdbtitle}&apikey=33294efb`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        let data = xhr.response;
        document.getElementById('content').innerHTML = `<div class = "row">
        <div class="column">
            <img src="${data.Poster}" alt="${data.Title}">
            <div style="display: flex;flex-direction: column;">
                <a href = 'https://imdb.com/title/${imdbtitle}' id = "imdb-link" >
                    <span style="margin-top: 20px;font-size: 30px;"><span style="font-weight: bold;"> Imdb Rating</span> - ${data.imdbRating}</span>
                    <br/>
                    <span style=" font-size: 25px;"><span style="font-weight: bold;">Imdb Votes</span> - ${data.imdbVotes}</span>
                </a>
            </div>
        </div>
        <div class = "column" id = "movie-info">
            <a href = 'https://google.com/search?q=${titlemovie}' id = "google-link" >
                <span style="text-decoration: underline;font-weight: bold;">${data.Title}(${data.Year})</span>
            </a>
            <div>${data.Rated} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.Runtime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.Genre}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.Released}(${data.Country})</div><br/><br/>
            <div><span style="font-weight: bold;">Plot -</span> ${data.Plot}</div>
            <div><span style="font-weight: bold;">Awards -</span> ${data.Awards}.</div>
            <div><span style="font-weight: bold;">Director -</span> ${data.Director}</div>
            <div><span style="font-weight: bold;">Writers -</span> ${data.Writer}</div>
            <div><span style="font-weight: bold;">Actors -</span> ${data.Actors}</div>
        </div>`;
        getRedditInfo(titlemovie);
    }
    xhr.send();
    let xhr1 = new XMLHttpRequest();
    let url1 = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${titlemovie}&info=1&k=389627-hackersi-7OS4QQY2`;
    xhr1.open('GET', url1, true);
    xhr1.responseType = 'json';
    xhr1.onload = () => {
        if (xhr.status == 200) {
            let data1=xhr1.response;
            if (data1.Similar.Info[0].yUrl.length != 0) {
                document.getElementById('videoo').innerHTML = `<div style="display: flex;flex-direction: column;margin-left: 120px;margin-top: 80px;margin-bottom: 50px;">
                <iframe style="display: inline-block;" width="560" height="315" src="${data1.Similar.Info[0].yUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
            }
            if (data1.Similar.Info[0].wTeaser.length != 0) {
                document.getElementById('videoo').innerHTML += `<div style="display: flex;flex-direction: column;">
                    <span style="font-size: 23px; margin-left: 60px; margin-top: 80px;margin-right: 70px;"><span style="font-weight: bold;text-decoration: none"><a class="wikilink" target="_blank" href="${data1.Similar.Info[0].wUrl}">Info</a></span>&nbsp; - &nbsp; ${data1.Similar.Info[0].wTeaser}</span>
                </div>`;
            }
        }
        document.getElementById('loader').classList.remove('loader');
    }
    xhr1.send();
}

function parseReddit(res) {
    var returnParsed = "<div><ul style='list-style-type: none'>";
    for (const child of res["data"]["children"]) {
        returnParsed += "<li><blockquote>" + "<a class = 'reddit-text' href='https://reddit.com" + child["data"]["permalink"]
            + "'>" + child["data"]["title"] + "</a>" + "<cite><a class = 'reddit-sub' href='https://reddit.com/r/"
            + child["data"]["subreddit"] + "'>" + child["data"]["subreddit"] + "</a></cite></blockquote></li>";
    }
    returnParsed += "</ul></div>";
    return returnParsed;
}

function getRedditInfo(movieTitle) {
    movieTitle = movieTitle.replace(' ', '%20');
    document.getElementById("reddit").innerHTML = '<div id="fa-reddit"><i class="fa fa-reddit fa-3x"></i> Most Relevant on Reddit</div>';
    let url = "https://www.reddit.com/search.json?q=";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("reddit").innerHTML += parseReddit(JSON.parse(this.responseText));
        }
    };
    const params = "&limit=10&sort=relevance";
    xhttp.open("GET", url + movieTitle + params, true);
    xhttp.send();
}

window.onload = function () {
    Particles.init({
        selector: '#particles',
        maxParticles: 200,
        color: '#000',
        sizeVariations: 10,
        speed: 2,
        connectParticles: false,
        minDistance: 90
    });
};