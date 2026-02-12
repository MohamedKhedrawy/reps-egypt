export function serializeMongo(data) {
  return JSON.parse(JSON.stringify(data));
}
