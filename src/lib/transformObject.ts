// https://gist.github.com/ManUtopiK/469aec75b655d6a4d912aeb3b75af3c9

type JsonArray = Json[];
type JsonValue = string | number | boolean | null;
type JsonObject = { [key: string]: Json };

export type Json =
  | JsonArray
  | JsonValue
  | JsonObject;

type JsonObj = { [key: string]: Json };

function isObject(input: Json): input is JsonObject {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

export default function transformObject(obj: Json): Json {
  if (isObject(obj)) {
    if (Array.isArray(obj) && obj.every(isObject)) {
      return obj.map((element) => transformObject(element));
    } else if (obj.edges && Array.isArray(obj.edges)) {
      return obj.edges.map((edge) => {
        if (edge && isObject(edge)) {
          return transformObject(edge.node);
        }
        return edge;
      });
    }
    return Object.keys(obj).reduce((result: JsonObj, key) => {
      const value = obj[key];
      result[key] = isObject(value) ? transformObject(value) : value;
      return result;
    }, {} as JsonObj);
  }
  if (Array.isArray(obj)) {
    return obj.map(transformObject);
  }
  return obj;
}
