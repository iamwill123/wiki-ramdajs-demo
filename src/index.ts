import "bootstrap/dist/css/bootstrap.min.css";
import { makeSearchRequestIfValid } from "./helpers";

const inputElem = document.querySelector("input");
inputElem.addEventListener("keyup", makeSearchRequestIfValid);
