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
 * - useSearchParams로 URL 상태 관리 및 useExamListQuery로 서버 데이터 페칭
 */
export default function ExamManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'
  const course = searchParams.get('course') || ''
  const subject = searchParams.get('subject') || ''
  const search = searchParams.get('search') || ''

  const updateParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries())
    const updated = { ...current, ...newParams }

    Object.keys(updated).forEach((key) => {
      if (!updated[key]) delete updated[key]
    })

    setSearchParams(updated)
  }

  // 서버 데이터 fetch
  const { data, isLoading } = useExamListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: search || undefined,
    subjectId: subject ? Number(subject) : undefined,
  })

  // 데이터 변환
  const exams: Exam[] = data?.exams?.map(transformExam) ?? []
  const totalCount = data?.total_count ?? 0
  const pageCount = Math.ceil(totalCount / PAGE_SIZE)

  // 모달 제어
  const createModal = useModal()
  const detailModal = useModal<Exam>()
  const deployModal = useModal<Exam>()
  const updateModal = useModal<Exam>()

  const handleChangeFilters = (key: string, value: string) => {
    updateParams({ [key]: value, page: '1' })
  }

  const handleChangeSearch = (value: string) => {
    updateParams({ search: value })
  }

  const handleSearch = () => {
    updateParams({ page: '1' })
  }

  const renderExamList = () => {
    if (isLoading)
      return (
        <div className="py-20 text-center text-neutral-400">로딩 중...</div>
      )

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
        <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
          쪽지시험 관리
        </h1>

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
