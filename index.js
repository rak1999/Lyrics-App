const form = document.getElementById("form");
const Search = document.getElementById("search");
const result = document.getElementById("result");

var api = "https://api.lyrics.ovh";

form.addEventListener("submit", e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if(!searchValue) {
        alert("Nothing to Search");
    } else {
        beginSearch(searchValue);
    }
})

// Create Search Function

async function beginSearch(searchValue){
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();

    // console.log(data);
    displayData(data);
}

//Display Search Result

function displayData(data){
    result.innerHTML = 
    `
        <ul class = "songs">
            ${data.data.map( song => 
            `
                <li>
                    <div>
                        <strong>
                            ${song.artist.name}
                        </strong> - ${song.title}
                    </div> 
                    <span data-artist = "${song.artist.name}" data.songtitle = "${song.title}">
                        Get Lyrics
                    </span>
                </li>
            `
            ).join('')}
        </ul>
    `;
}

// Get Lyrics Function

result.addEventListener("click" , e => {
    const clickedEle = e.target;

    // check get lyrics button
    if(clickedEle.tagName === 'SPAN'){
        const artist = clickedEle.getAttribute('data-artist');
        const songTitle = clickedEle.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle) {
    const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    console.log(data);
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g , '<br>');
    console.log(lyrics);
    result.innerHTML =
    `
        <h2>
            <strong>
                ${artist}
            </strong> - ${songTitle}
        </h2>
        <p>
            ${lyrics}
        </p>
    `;
}