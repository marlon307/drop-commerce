// https://gist.github.com/ManUtopiK/469aec75b655d6a4d912aeb3b75af3c9

type Json = Json[] | string | number | boolean | null | { [key: string]: Json };

type JsonObj = { [key: string]: Json };

function isObject(input: Json): input is JsonObj {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

export default function transformObject(obj: Json): Json {
  if (isObject(obj)) {
    if (obj.edges && Array.isArray(obj.edges))
      return obj.edges.map((edge) =>
        edge && isObject(edge) ? transformObject(edge.node) : edge,
      );

    return Object.keys(obj).reduce((result: JsonObj, key) => {
      const value = obj[key];
      result[key] = isObject(value) ? transformObject(value) : obj[key];
      return result;
    }, {} as JsonObj);
  }
  if (Array.isArray(obj)) return obj.map(transformObject);
  return obj;
}
