export const createTag = (tagName, attributes) => {
  const element = document.createElement(tagName);

  for (let attrName in attributes) {
    element.setAttribute(attrName, attributes[attrName]);
  }

  return element;
};
