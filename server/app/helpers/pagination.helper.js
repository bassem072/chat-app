export const pagination = (query) => {
  const page = {};

  page.sort[req.query.sort ?? "created_at"] =
    query.inc === "desc" ? "desc" : "asc";
  if (query.limit) {
    page.limit = query.limit;
    page.page = query.page ?? 1;
  }

  return page;
};

export const chatPagination = (query) => {
  const page = {};

  page.sort[req.query.sort ?? "updatedAt"] =
    query.inc === "desc" ? "desc" : "asc";
  if (query.limit) {
    page.limit = query.limit;
    page.page = query.page ?? 1;
  }
  page.searchString = query.searchString ?? "";

  return page;
};
