var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    redirectUri: process.env.redirect_uri,
});

spotifyApi.setAccessToken("") //Access Token

const button = document.getElementById("getButton");
const img = document.querySelector("img");
const plName = document.querySelector("#playlist-name");
const help = document.querySelector("#help")

button.addEventListener("click", getCover);
help.addEventListener("click", function () {
    alert(`Insert a link like this:
https://open.spotify.com/playlist/6SYgwzkXjPuCaT2P6b0pqK?si=625125663f8f4b5c`)
})


function getCover() {
    let playlistLink = document.querySelector("input").value

    if (playlistLink.includes("open.spotify.com")) {
        playlistLink = playlistLink.split("/")[4]
        playlistLink = playlistLink.split("?")[0]
    }

    spotifyApi.getPlaylist(playlistLink).then(
        function (data) {
            img.setAttribute("src", data.body.images[0].url)
            plName.innerText = data.body.name
            plName.setAttribute("href", data.body.external_urls.spotify)
        },
        function (err) {
            console.log(err)
        }
    );
}






