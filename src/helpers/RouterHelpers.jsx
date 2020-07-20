function setParams({ query }) {
  const searchParams = new URLSearchParams();
  searchParams.set("q", query || "");
  return searchParams.toString();
}

export function updateURL(query, history) {
  const url = setParams({ query: query });
  history.push(`?${url}`);
}
