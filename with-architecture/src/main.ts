import { searchBooks } from "./ui/searchBooks";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>Book Searcher</h1>
    <div class="search-box">
      <input type="text" id="search" placeholder="Search for books..." />
      <button id="searchButton">Search</button>
    </div>
    <div id="results"></div>
  </div>
`;

document.getElementById("searchButton")!.addEventListener("click", searchBooks);
