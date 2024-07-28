// Get query param with name q from url
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("q");
const providers = [
  { name: "google", linker: googleLinker },
  { name: "openstreet", linker: openstreetLinker },
];

function googleLinker(searchQuery) {
  return "https://www.google.com/maps/search/" + searchQuery;
}

function openstreetLinker(searchQuery) {
  return `https://www.openstreetmap.org/search?query=${searchQuery}`;
}

// If query param is not empty
if (myParam) {
  chrome.storage.sync.get(["selectedProvider"], function (result) {
    var container = document.querySelector(".fM33ce.dRYYxd");

    if (!container) return;

    // Create button element
    var button = document.createElement("button");
    var svg = document.createElement("svg");
    svg.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>';

    // Set button text
    button.appendChild(svg);

    if (result.selectedProvider) {
      // set button click event
      button.onclick = function () {
        // Open new tab with google maps search
        chrome.storage.sync.get(["selectedProvider"], function (result) {
          if (result.selectedProvider) {
            var linker = providers.find(
              (provider) => provider.name === result.selectedProvider
            ).linker;
            window.open(linker(myParam));
          }
        });
      };
    } else {
      console.log("No provider selected");
      button.onclick = function () {
        chrome.storage.sync.get(["selectedProvider"], function (result) {
          if (result.selectedProvider) {
            var linker = providers.find(
              (provider) => provider.name === result.selectedProvider
            ).linker;
            window.open(linker(myParam));
          } else {
            // Open popup
            chrome.runtime.sendMessage({ action: "openPopup" });
          }
        });
      };
    }

    // inject button to container
    container.appendChild(button);
  });
}
