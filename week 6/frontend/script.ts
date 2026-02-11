const src: URL = new URL("/", "http://localhost:3000");

async function res(url: URL): Promise<String> {
  let response: Response = await fetch(url);
  let json = await response.json();
  return json.response;
}

async function init() {
  let result: String = await res(src);
  document.querySelector("div").insertAdjacentHTML("beforeend", result.toString());

  let form: HTMLFormElement = document.querySelector("form");
  let input: HTMLInputElement = document.querySelector("form > input");

  input.addEventListener("change", (event) => {
    const file: File = (event.target as HTMLInputElement).files[0];
    console.log(`filename: ${file.name}`);
    console.log(`file size: ${file.size} bytes`);
    console.log(`file type: ${file.type}`);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let file: File = (document.getElementById("uploadImage") as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    let response: Response = await fetch(src + "upload", {method: "POST", body: formData });
    let json = await response.json();
    document.querySelector("body").insertAdjacentHTML("beforeend", "<p>" + json.filename.filename + " uploaded successfully!</p>");
  })
}

init();