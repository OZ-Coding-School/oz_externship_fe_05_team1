export function getPaginationRange(
  pageIndex: number,
  pageCount: number,
  maxPages = 10
) {
  let startPage = Math.max(0, pageIndex - Math.floor(maxPages / 2))
  let endPage = startPage + maxPages

  if (endPage > pageCount) {
    endPage = pageCount
    startPage = Math.max(0, endPage - maxPages)
  }

  return { startPage, endPage }
}
