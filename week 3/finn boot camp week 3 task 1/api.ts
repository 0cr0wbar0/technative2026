// Dedicated URL type, rather than string
// Objects exist and are defined with "new"
const url: URL = new URL("/", "https://icanhazdadjoke.com");
let joke: string = "";

async function requestJoke(url: URL): Promise<string> {
  let response: Response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "cr0wbar (https://github.com/0cr0wbar0)",
    },
  });
  let json = await response.json();
  return json.joke;
}

async function addJoke(newJoke: String) {
  // querySelector() use is scary! The selected element could be anything,
  // so casting is necessary to reassure the compiler:
  let rating: string = (document.querySelector(".rating") as HTMLInputElement)
    .value;
  let resultLookup: string = ".".concat(rating.concat("-joke-list"));

  // "!" operator forces compiler to ignore possible instances of "null"
  let selectedRating: HTMLUListElement = document.querySelector(resultLookup)!;
  selectedRating.insertAdjacentHTML("beforeend", "<li>" + newJoke + "</li>");
  joke = await requestJoke(url);
  let jokeParagraph: HTMLParagraphElement = document.querySelector(".joke")!;
  jokeParagraph.innerHTML = joke;
}

async function init() {
  let initJoke: string = await requestJoke(url);
  joke = initJoke;
  let jokeParagraph: HTMLParagraphElement = document.querySelector(".joke")!;
  jokeParagraph.innerHTML = joke;
  let button: HTMLButtonElement = document.querySelector("button")!;
  button.addEventListener("click", () => {
    addJoke(joke);
  });
}

init();
