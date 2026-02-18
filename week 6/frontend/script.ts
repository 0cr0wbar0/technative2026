const src: URL = new URL("/", "http://localhost:3000");

async function res(url: URL): Promise<any> {
  try {
    let response: Response = await fetch(url);
    let json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

// function toggleCookie(): void {
//   let paragraph = document.getElementById(
//     "toggle-message",
//   ) as HTMLParagraphElement;
//   if (!document.cookie) {
//     document.cookie = "Admin=True";
//     paragraph.innerText = "You are now admin!";
//   } else {
//     document.cookie += "; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
//     paragraph.innerText = "You are no longer admin!";
//   }
// }

async function init() {
  let results = await res(src);
  for (let i = 0; i < Object.keys(results).length; i++) {
    document
      .querySelector("div")
      .insertAdjacentHTML(
        "beforeend",
        "<img src=" + results[`image-${i}`] + " height=200px>",
      );
  }

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
    let file: File = (
      document.getElementById("uploadImage") as HTMLInputElement
    ).files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    let response: Response = await fetch(src + "upload", {
      method: "POST",
      body: formData,
    });
    let json = await response.json();
    document
      .querySelector("body")
      .insertAdjacentHTML(
        "beforeend",
        "<p>" + json.filename.filename + " uploaded successfully!</p>",
      );
  });
}

init();
