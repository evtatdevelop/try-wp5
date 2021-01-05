import _ from "lodash";
import "./style.css";
import Kitty from "./kitty.jpg";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  // Add the image to our new div
  // kittyImg.classList.add("kitty");
  const myKitty = new Image();
  myKitty.src = Kitty;
  myKitty.classList.add("kitty");
  element.appendChild(myKitty);

  return element;
}

document.body.appendChild(component());
