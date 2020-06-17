import {
  concat,
  pathOr,
  compose,
  pipe,
  tryCatch,
  trim,
  ifElse,
  isEmpty,
  tap,
} from "ramda";
import { ui, render } from "./resultsMarkup";

const wikiSearchUrl =
  "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

const getInputValues = compose(trim, pathOr("", ["target", "value"]));
const searchFor = concat(wikiSearchUrl);
const getSearchResults = tryCatch(
  (url) => {
    fetch(url)
      .then((res) => res.json())
      .then(ui)
      .then((ui) => render(ui, "#results"));
  },
  (error) => {
    console.log("error", error);
  }
);

const searchTheQueryThenRenderResults = compose(
  getSearchResults,
  tap((x) => console.log("searchFor", x)),
  searchFor
);

const doNothing = () => {};
const makeSearchRequestIfValid = compose(
  ifElse(
    isEmpty,
    doNothing,
    searchTheQueryThenRenderResults
  ),
  tap((x) => console.log("input values", x)),
  getInputValues
);

export { makeSearchRequestIfValid };
