import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

type UrlFilterKeys = {
  subjectId?: string
  cohortId?: string
  searchKeyword?: string
}

type UseUrlFiltersOptions = {
  preserveKeys?: string[]
}

/**
 * URL 필터 공통 훅
 * page는 URL에서 직접 읽음
 * 필터(UI 제어값)만 state
 */
export function useUrlFilters(options?: UseUrlFiltersOptions) {
  const preserveKeys = options?.preserveKeys ?? []
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const subjectIdFromUrl = searchParams.get('subject_id') || ''
  const cohortIdFromUrl = searchParams.get('cohort_id') || ''
  const searchKeywordFromUrl = searchParams.get('search_keyword') || ''

  const [filters, setFilters] = useState<Required<UrlFilterKeys>>({
    subjectId: subjectIdFromUrl,
    cohortId: cohortIdFromUrl,
    searchKeyword: searchKeywordFromUrl,
  })

  useEffect(() => {
    setFilters({
      subjectId: subjectIdFromUrl,
      cohortId: cohortIdFromUrl,
      searchKeyword: searchKeywordFromUrl,
    })
  }, [subjectIdFromUrl, cohortIdFromUrl, searchKeywordFromUrl])

  const updateSearchParams = (filterKeys: Partial<UrlFilterKeys>) => {
    const params: Record<string, string> = {
      page: '1',
      size: '10',
    }

    preserveKeys.forEach((key) => {
      const value = searchParams.get(key)

      if (value) {
        params[key] = value
      }
    })

    if (filterKeys.searchKeyword) {
      params.search_keyword = filterKeys.searchKeyword
    }
    if (filterKeys.subjectId) {
      params.subject_id = filterKeys.subjectId
    }
    if (filterKeys.cohortId) {
      params.cohort_id = filterKeys.cohortId
    }

    setSearchParams(params)
  }

  const changePage = (nextPage: number) => {
    const current = Object.fromEntries(searchParams.entries())

    setSearchParams({
      ...current,
      page: String(nextPage),
    })
  }

  return {
    page,
    filters,
    setFilters,
    updateSearchParams,
    changePage,
  }
}
