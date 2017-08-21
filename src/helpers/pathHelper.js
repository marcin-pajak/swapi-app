export const urlToRoute = (url) => {
  const parts = url.split("/");
  const type = parts[4];
  const id = parts[5];
  return `/${type}-${id}`;
};

export const routeToUrl = (route) => {
  const parts = route.split("-");
  const type = parts[0];
  const id = parts[1];
  return `https://swapi.co/api/${type}/${id}/`;
};