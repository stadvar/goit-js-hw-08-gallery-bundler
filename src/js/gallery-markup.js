import galerry from "./gallery-items.js";

// Gallery Markup
let i = 0; // label for each <a> element
const ElemArr = galerry.map(({ preview, original, description }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.src = preview;
  img.alt = description;

  a.classList.add("gallery__link");
  a.href = original;
  a.title = description;
  a.setAttribute("data-num", i);

  li.classList.add("gallery__item");

  a.append(img);
  li.append(a);
  i += 1;
  return li;
});

export default ElemArr;
