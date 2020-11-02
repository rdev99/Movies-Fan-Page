function moviesearch() {
    document.getElementById('videoo').innerHTML='';
    document.getElementById('listitem').innerHTML = ``;
    let movie = document.getElementById('movinput').value;
    document.getElementById('movinput').value='';
    const xhr = new XMLHttpRequest();
    let url=`http://www.omdbapi.com/?s=${movie}&apikey=33294efb`
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        document.getElementById('listitem').innerHTML = ``;
        document.getElementById('content').innerHTML='';
        let data=xhr.response;
        let list = '';
        for(let i=0;i<data.Search.length;i++)
        {
            if(data.Search[i].Poster === "N/A")
            {
                continue;
            }
            
            list=list+`<div class="content-search" onclick="getmovie('${data.Search[i].imdbID}','${data.Search[i].Title}')"><img src="${data.Search[i].Poster}" alt=""><h2 style="text-align: center;">${data.Search[i].Title}(${data.Search[i].Year})</h2></div>`
        }
        document.getElementById('listitem').innerHTML=list;
    }
    xhr.send();
}

function getmovie(imdbtitle,titlemovie) {
    document.getElementById('listitem').innerHTML = ``;
    document.getElementById('content').innerHTML='';
    document.getElementById('loader').classList.add('loader');
    let url = `http://www.omdbapi.com/?i=${imdbtitle}&apikey=33294efb`
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        let data=xhr.response;
        document.getElementById('content').innerHTML=`<div style="display: flex;flex-direction: column;">
            <img src="${data.Poster}" alt="${data.Title}">
            <div style="display: flex;flex-direction: column;">
                <span style="margin-top: 20px;font-size: 30px;"><span style="font-weight: bold;"> Imdb Rating</span> - ${data.imdbRating}</span>
                <span><span style="font-weight: bold;">Imdb Votes</span> - ${data.imdbVotes}</span>
            </div>
        </div>
        <div style="display: flex;flex-direction: column;">
            <span style="margin-left: 180px;margin-top: 20px;font-size: 60px;text-decoration: underline;font-weight: bold;">${data.Title}(${data.Year})</span>
            <div style="margin-left: 200px;font-size: 20px;margin-top: 10px;">${data.Rated} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.Runtime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.Genre}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.Released}(${data.Country})</div>
            <div style="margin-left:180px;margin-top: 30px;font-size: 25px;margin-right: 100px;"><span style="font-weight: bold;">Plot -</span> ${data.Plot}</div>
            <div style="margin-left:180px;margin-top: 30px;font-size: 25px;"><span style="font-weight: bold;">Awards -</span> ${data.Awards}.</div>
            <div style="margin-left:180px;margin-top: 30px;font-size: 25px;"><span style="font-weight: bold;">Director -</span> ${data.Director}</div>
            <div style="margin-left:180px;margin-top: 30px;font-size: 25px;margin-right: 80px;"><span style="font-weight: bold;">Writers -</span> ${data.Writer}</div>
            <div style="margin-left:180px;margin-top: 30px;font-size: 25px;margin-right: 80px;"><span style="font-weight: bold;">Actors -</span> ${data.Actors}</div>
            
        </div>`;
    }
    xhr.send();
    let xhr1 = new XMLHttpRequest();
    let url1 = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${titlemovie}&info=1&k=389627-hackersi-7OS4QQY2`;
    xhr1.open('GET',url1,true);
    xhr1.responseType = 'json';
    xhr1.onload = () => {
        document.getElementById('loader').classList.remove('loader');
        let data1=xhr1.response;
        console.log(data1);
        document.getElementById('videoo').innerHTML=`<div style="display: flex;flex-direction: column;margin-left: 120px;margin-top: 80px;margin-bottom: 50px;">
        <iframe style="display: inline-block;" width="560" height="315" src="${data1.Similar.Info[0].yUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div style="display: flex;flex-direction: column;">
            <span style="font-size: 23px; margin-left: 60px; margin-top: 80px;margin-right: 70px;"><span style="font-weight: bold;text-decoration: none"><a class="wikilink" target="_blank" href="${data1.Similar.Info[0].wUrl}">Info</a></span>&nbsp; - &nbsp; ${data1.Similar.Info[0].wTeaser}</span>
        </div>`;

    }
    xhr1.send();
}

window.onload = function() {
    Particles.init({
      selector: '#particles',
      maxParticles : 200,
      color : '#000',
      sizeVariations : 10,
      speed : 2,
      connectParticles : false,
      minDistance : 90
    });
};