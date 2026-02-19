const src: URL = new URL("/", "http://localhost:3000");

let uploadForm = document.getElementById("upload-form") as HTMLFormElement;
let uploadInput = document.querySelector(
  "#upload-form input",
) as HTMLInputElement;
let deleteSelect = document.getElementById("deleteImage") as HTMLSelectElement;
let deleteButton = document.getElementById(
  "delete-submit",
) as HTMLButtonElement;

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
    let receivedImage = results[`image-${i}`];
    let imageName: string = new URL(receivedImage).pathname.split("/").pop();
    document
      .querySelector("div")
      .insertAdjacentHTML(
        "beforeend",
        "<div><img src=" +
          receivedImage +
          " height=200px><p>" +
          imageName +
          "</p></div>",
      );
    let imageInMenu: HTMLOptionElement = document.createElement("option");
    imageInMenu.text = imageName;
    imageInMenu.value = imageName;
    deleteSelect.add(imageInMenu);
  }

  uploadInput.addEventListener("change", (event) => {
    const file: File = (event.target as HTMLInputElement).files[0];
    console.log(`filename: ${file.name}`);
    console.log(`file size: ${file.size} bytes`);
    console.log(`file type: ${file.type}`);
  });

  uploadForm.addEventListener("submit", async (e) => {
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

  deleteButton.addEventListener("click", async (e) => {
    let toDelete = deleteSelect.selectedOptions[0].value;
    let deleteResponse: Response = await fetch(src + "static/" + toDelete, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    let json = await deleteResponse.json();
    console.log(JSON.stringify(json));
  });
}

init();
