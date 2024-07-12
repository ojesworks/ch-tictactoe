const snake = (value) => value.replace(/([A-Z])/g, (_, v) => `-${v.toLowerCase()}`);
export const createTag = (tagName, attributes) => {
  const element = document.createElement(tagName);

  for (let attrName in attributes) {
    element.setAttribute(snake(attrName), attributes[attrName]);
  }

  return element;
};
