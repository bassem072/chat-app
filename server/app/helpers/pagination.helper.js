export const pagination = (query) => {
  const pag = {};

  pag.sort[req.query.sort ?? "created_at"] =
    query.inc === "desc" ? "desc" : "asc";
  pag.limit = query.limit ?? 10;
  pag.page = query.page ?? 1;
  pag.searchString = query.searchString ?? "";

  return pag;
};
