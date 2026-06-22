var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var src = new URL("/", "http://localhost:3000");
var uploadForm = document.getElementById("upload-form");
var uploadInput = document.querySelector("#upload-form input");
var deleteSelect = document.getElementById("deleteImage");
var deleteButton = document.getElementById("delete-submit");
function res(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
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
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, receivedImage, imageName, imageInMenu;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, res(src)];
                case 1:
                    results = _a.sent();
                    for (i = 0; i < Object.keys(results).length; i++) {
                        receivedImage = results["image-".concat(i)];
                        imageName = new URL(receivedImage).pathname.split("/").pop();
                        document
                            .querySelector("div")
                            .insertAdjacentHTML("beforeend", "<div><img src=" +
                            receivedImage +
                            " height=200px><p>" +
                            imageName +
                            "</p></div>");
                        imageInMenu = document.createElement("option");
                        imageInMenu.text = imageName;
                        imageInMenu.value = imageName;
                        deleteSelect.add(imageInMenu);
                    }
                    uploadInput.addEventListener("change", function (event) {
                        var file = event.target.files[0];
                        console.log("filename: ".concat(file.name));
                        console.log("file size: ".concat(file.size, " bytes"));
                        console.log("file type: ".concat(file.type));
                    });
                    uploadForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var file, formData, response, json;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e.preventDefault();
                                    file = document.getElementById("uploadImage").files[0];
                                    formData = new FormData();
                                    formData.append("file", file, file.name);
                                    return [4 /*yield*/, fetch(src + "upload", {
                                            method: "POST",
                                            body: formData,
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    json = _a.sent();
                                    document
                                        .querySelector("body")
                                        .insertAdjacentHTML("beforeend", "<p>" + json.filename.filename + " uploaded successfully!</p>");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    deleteButton.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var toDelete, deleteResponse, json;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    toDelete = deleteSelect.selectedOptions[0].value;
                                    return [4 /*yield*/, fetch(src + "static/" + toDelete, {
                                            method: "DELETE",
                                            headers: { "Content-Type": "application/json; charset=UTF-8" },
                                        })];
                                case 1:
                                    deleteResponse = _a.sent();
                                    return [4 /*yield*/, deleteResponse.json()];
                                case 2:
                                    json = _a.sent();
                                    console.log(JSON.stringify(json));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
init();
