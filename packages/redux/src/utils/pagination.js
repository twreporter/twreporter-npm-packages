const pageToOffset = ({ page, nPerPage }) => ({
  limit: nPerPage,
  offset: (page - 1) * nPerPage,
})

const offsetToPage = ({ limit, offset, total }) => ({
  nPerPage: limit,
  page: Math.floor(offset / limit) + 1,
  totalPages: Math.ceil(total / limit),
})

export default {
  pageToOffset,
  offsetToPage,
}
