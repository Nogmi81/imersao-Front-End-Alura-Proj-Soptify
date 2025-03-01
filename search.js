const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch("./api-artists/artists.json")
    .then(response => response.json())
    .then(data => {
      console.log("Dados do JSON:", data);

      if (data && Array.isArray(data.artists)) { // Verifica se 'data' existe e se 'data.artists' é um array
        const filteredResults = data.artists.filter(artist =>
          artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log("Resultados filtrados:", filteredResults);
        displayResults(filteredResults);
      } else {
        console.error("Erro: 'data.artists' não é um array ou 'data' é inválido.");
      }
    })
    .catch(error => console.error("Erro ao ler o arquivo JSON:", error));
}

function displayResults(results) {
  hidePlaylists();

  const gridContainer = resultArtist.querySelector(".grid-container");
  gridContainer.innerHTML = ""; // Limpa apenas os artistas, mantendo a estrutura original

  results.forEach((element) => {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");
    artistCard.innerHTML = `
      <div class="card-img">
        <img src="${element.urlImg}" alt="${element.name}" class="artist-img"/>
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <span class="artist-name">${element.name}</span>
        <span class="artist-categorie">Artista</span>
      </div>
    `;
    gridContainer.appendChild(artistCard);
  });

  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchTerm)
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
