const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  const response = fetch("/api-artists/artists.json");
  const data = response.json();
    .then(response => response.json())
    .then(data => {
      console.log("Dados da API:", data); // Verifica se os dados estão vindo corretamente

      // Filtragem manual por nome ou gênero
      const filteredResults = data.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log("Resultados filtrados:", filteredResults); // Verifica se está filtrando corretamente
      displayResults(filteredResults);
    })
    .catch(error => console.error("Erro ao buscar artistas:", error));
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
