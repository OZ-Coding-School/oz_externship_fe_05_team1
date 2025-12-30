import { FilterSection } from '@components'
import { EXAM_DROPDOWNS, PAGE_SIZE } from '@constants'
import {
  EmptyState,
  type Exam,
  ExamDeploymentsModal,
  ExamFormModal,
  ExamList,
  ExamQuestionDetailModal,
  transformExam,
  useExamListQuery,
} from '@features/exams'
import { useModal } from '@hooks/useModal'
import { useSearchParams } from 'react-router'

/**
 * 쪽지시험 관리 페이지
 *
 * - 필터, 검색, 시험 목록을 관리하는 컨테이너 컴포넌트
 * - useSearchParams로 URL 상태 관리 (페이지 공유, 새로고침 시 상태 유지)
 * - 시험 데이터 유무에 따라 EmptyState 또는 ExamList 렌더링
 */
export default function ExamManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'
  const course = searchParams.get('course') || ''
  const subject = searchParams.get('subject') || ''
  const search = searchParams.get('search') || ''

  /**
   * URL 쿼리 파라미터 업데이트
   * - 빈 값은 URL에서 제거하여 깔끔한 URL 유지
   */
  const updateParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries())
    const updated = { ...current, ...newParams }

    Object.keys(updated).forEach((key) => {
      if (!updated[key]) delete updated[key]
    })

    setSearchParams(updated)
  }

  // 시험 목록 조회 (page 변경 시 자동 refetch)
  const { data, isLoading } = useExamListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: search || undefined,
    subjectId: subject ? Number(subject) : undefined,
  })

  // API 응답 -> 프론트 타입 변환
  const exams: Exam[] = data?.exams?.map(transformExam) ?? []
  const totalCount = data?.total_count ?? 0
  const pageCount = Math.ceil(totalCount / PAGE_SIZE)

  /**
   * 모달상태
   * - 시험 생성 페이지로 이동 또는 모달 오픈
   */
  const createModal = useModal()
  const detailModal = useModal<Exam>()
  const deployModal = useModal<Exam>()
  const updateModal = useModal<Exam>()

  /**
   * 필터 값 변경 핸들러
   * @param key - 변경할 필터 키
   * @param value - 선택된 필터 값
   */
  const handleChangeFilters = (key: string, value: string) => {
    updateParams({ [key]: value, page: '1' })
  }

  const handleChangeSearch = (value: string) => {
    updateParams({ search: value })
  }

  /**
   * 검색 버튼 클릭 핸들러
   * - 현재 필터와 검색어를 기반으로 시험 목록 조회
   */
  const handleSearch = () => {
    updateParams({ page: '1' })
  }

  // 랜더함수호출
  const renderExamList = () => {
    if (isLoading) {
      return <div>로딩 중...</div>
    }
    if (exams.length === 0) {
      return <EmptyState onButtonClick={createModal.modalOpen} />
    }

    return (
      <ExamList
        data={exams}
        pageCount={pageCount}
        pageIndex={Number(page) - 1}
        onPageChange={(index) => updateParams({ page: String(index + 1) })}
        onButtonClick={createModal.modalOpen}
        onExamUpdateClick={updateModal.modalOpen}
        onDetailClick={detailModal.modalOpen}
        onDeployClick={deployModal.modalOpen}
      />
    )
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] text-neutral-500">쪽지시험 관리</h1>
        <div className="mb-3">
          <FilterSection
            dropdowns={EXAM_DROPDOWNS}
            selectedValues={{ course, subject }}
            onChangeFilters={handleChangeFilters}
            search={search}
            onChangeSearch={handleChangeSearch}
            onSubmit={handleSearch}
          />
        </div>
        {renderExamList()}
        {detailModal.data && (
          <ExamQuestionDetailModal
            examId={detailModal.data.id}
            isOpen={detailModal.isOpen}
            onClose={detailModal.modalClose}
          />
        )}

        <ExamFormModal
          isOpen={createModal.isOpen || updateModal.isOpen}
          onClose={() => {
            createModal.modalClose()
            updateModal.modalClose()
          }}
          modalMode={updateModal.isOpen ? 'update' : 'create'}
          examId={updateModal.data?.id}
        />

        {deployModal.data && (
          <ExamDeploymentsModal
            examId={deployModal.data.id}
            examName={deployModal.data.title}
            subjectName={deployModal.data.subjectName}
            isOpen={deployModal.isOpen}
            onClose={deployModal.modalClose}
          />
        )}
      </div>
    </section>
  )
}
