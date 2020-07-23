const setParams = ({ query }) => {
  const searchParams = new URLSearchParams();
  searchParams.set("q", query || "");
  return searchParams.toString();
};

export const updateURL = (query, history) => {
  const url = setParams({ query: query });
  history.push(`?${url}`);
};
