import type * as CSS from "csstype";

export const iStyle = (styles: CSS.PropertiesHyphen) => {
  let str = "";

  for (const key in styles) {
    str += `${key}:${styles[key as keyof typeof styles]};`;
  }

  return str;
};
