/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit
} = require("../index.js");

beforeEach(() => {
  document.body.innerHTML = html;
});

describe("DOM Functions", () => {

  test("addElementToDOM adds content", () => {
    addElementToDOM("dynamic-content", "Hello");

    expect(document.getElementById("dynamic-content").innerHTML)
      .toBe("Hello");
  });

  test("removeElementFromDOM removes element", () => {
    const el = document.createElement("div");
    el.id = "temp";
    document.body.appendChild(el);

    removeElementFromDOM("temp");

    expect(document.getElementById("temp")).toBeNull();
  });

  test("simulateClick updates DOM", () => {
    simulateClick("dynamic-content", "Clicked!");

    expect(document.getElementById("dynamic-content").innerHTML)
      .toBe("Clicked!");
  });

  test("handleFormSubmit valid input updates DOM", () => {
    const input = document.querySelector("#user-form input");
    input.value = "Test Input";

    handleFormSubmit("user-form", "dynamic-content");

    expect(document.getElementById("dynamic-content").innerHTML)
      .toBe("Test Input");
  });

  test("handleFormSubmit shows error on empty input", () => {
    const input = document.querySelector("#user-form input");
    const error = document.getElementById("error-message");

    input.value = "";

    handleFormSubmit("user-form", "dynamic-content");

    expect(error.textContent).toBe("Input cannot be empty");
    expect(error.classList.contains("hidden")).toBe(false);
  });

});