//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

let displayResult = document.querySelector(".displaySearchResult");
let dropDownEl = document.querySelector("#selectEpisode");

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.textContent = "";
  episodeList.forEach((episode) => {
    let divEl = document.createElement("div");
    let headerEl = document.createElement("h2");
    let spanEl = document.createElement("span");
    let imageEl = document.createElement("img");
    let pEl = document.createElement("p");

    headerEl.textContent = `${episode.name} - `;
    imageEl.src = episode.image.medium;
    pEl.innerHTML = episode.summary;

    spanEl.textContent = displayEpisodeCode(episode);

    rootElem.appendChild(divEl);
    divEl.appendChild(headerEl);
    divEl.appendChild(imageEl);
    divEl.appendChild(pEl);
    headerEl.appendChild(spanEl);

    divEl.className = "episodeBox";

    //ADDING OPTIONS TO DROPDOWN SELECT ELEMENT

    let optionEl = document.createElement("option");
    optionEl.textContent = `${displayEpisodeCode(episode)} - ${episode.name}`;
    optionEl.value = `${episode.name}`;
    dropDownEl.appendChild(optionEl);
  });
  // EVENT LISTENER TO SEARCH INPUT FIELD
  let searchInput = document.querySelector(".search");
  searchInput.addEventListener("keyup", searchEpisodes);

  //DISPLAYING SEARCH RESULT
  displayResult.textContent = `Displaying ${episodeList.length} / ${episodeList.length}`;

  //EVENT LISTENER TO SELECT OPTION FROM DROPDOWN
  dropDownEl.addEventListener("change", selectEpisode);
}

// LIVE SEARCH
function searchEpisodes(event) {
  let searchTerm = event.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter((episode) => {
    let name = episode.name.toLowerCase();
    let summary = episode.summary.toLowerCase();
    return name.includes(searchTerm) || summary.includes(searchTerm);
  });
  makePageForEpisodes(filteredEpisodes);
  displayResult.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length}`;
}

//FUNCTION TO RETURN EPISODE CODE
function displayEpisodeCode(episode) {
  let season = episode.season;
  let episodeNum = episode.number;

  if (season < 10 || episode < 10) {
    season = `0${season}`;
    episodeNum = `0${episodeNum}`;
  }
  return `S${season}E${episodeNum}`;
}

//FUNCTION TO SELECT OPTION FROM DROPDOWN
function selectEpisode(event) {
  let selection = event.target.value;
  if (selection === "default") {
    return makePageForEpisodes(allEpisodes);
  }
  console.log(selection);
  let selectedEpisode = allEpisodes.filter((episode) => {
    if (episode.name === selection) {
      return true;
    } else {
      return false;
    }
  });
  makePageForEpisodes(selectedEpisode);
  displayResult.textContent = `Displaying ${selectedEpisode.length} / ${allEpisodes.length}`;
}
window.onload = setup;
