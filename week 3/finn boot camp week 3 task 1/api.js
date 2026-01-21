const url = "https://icanhazdadjoke.com";

// const responseList = [];

async function requestJoke(endpoint) {
  try {
    let response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "cr0wbar (https://github.com/0cr0wbar0)",
      },
    });
    let json = await response.json();
    return json.joke;
  } catch (e) {
    console.error("Error:", error);
  }
}

async function addJoke(joke) {
  let rating = document.querySelector(".rating").value;
  let resultLookup = {
    S: ".S-joke-list",
    A: ".A-joke-list",
    B: ".B-joke-list",
    C: ".C-joke-list",
    D: ".D-joke-list",
    F: ".F-joke-list",
  };
  document
    .querySelector(resultLookup[rating])
    .insertAdjacentHTML("beforeend", "<li>" + joke + "</li>");
  let nextJoke = await requestJoke(url);
  document.querySelector(".joke").innerHTML = nextJoke;

  // Hack - remove new event listeners
  let button = document.querySelector("button");
  button.replaceWith(button.cloneNode(true));

  document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    addJoke(nextJoke);
  });
}

// async function initInput() {
//   let input = document.querySelector(".joke-choice");
//   let joke;
//   do {
//     joke = await requestJoke(url);
//     console.log(joke);
//   } while (responseList.includes(joke));
//   responseList.concat([joke]);
//   console.log(responseList);
//   input.setAttribute("value", joke);
// }

async function init() {
  let initJoke = await requestJoke(url);
  document.querySelector(".joke").innerHTML = initJoke;
  document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    addJoke(initJoke);
  });
}

init();

// initInput();
