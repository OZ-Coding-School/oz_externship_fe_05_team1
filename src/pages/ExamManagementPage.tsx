import { FilterSection } from '@components'
import { EXAM_DROPDOWNS } from '@constants'
import {
  EmptyState,
  type Exam,
  ExamCreateModal,
  ExamDeploymentsModal,
  ExamList,
  ExamQuestionDetailModal,
  transformExam,
  useExamListQuery,
} from '@features/exams'
import { useModal } from '@hooks/useModal'
import { useState } from 'react'

/**
 * 쪽지시험 관리 페이지
 * - 필터, 검색, 시험 목록/빈 상태를 관리하는 컨테이너 컴포넌트
 * - 시험 데이터 유무에 따라 EmptyState 또는 ExamList 렌더링
 * - 스토리북 테스트를 위해 initialInfo = [] 추가
 */
export default function ExamManagementPage() {
  const [page] = useState(1)
  const [size] = useState(10)

  const [filters, setFilters] = useState<Record<string, string>>({
    course: '',
    subject: '',
  })

  const [search, setSearch] = useState('')

  const { data, isLoading } = useExamListQuery({
    page,
    size,
    searchKeyword: search || undefined,
    subjectId: filters.subject ? Number(filters.subject) : undefined,
  })

  // API 응답 -> 프론트타입 변환
  const exams: Exam[] = data?.exams?.map(transformExam) ?? []

  /**
   * 모달상태
   * - 시험 생성 페이지로 이동 또는 모달 오픈
   */
  const createModal = useModal()
  const detailModal = useModal<Exam>()
  const deployModal = useModal<Exam>()

  /**
   * 필터 값 변경 핸들러
   * @param key - 변경할 필터 키
   * @param value - 선택된 필터 값
   */
  const handleChangeFilters = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  /**
   * 검색 버튼 클릭 핸들러
   * - 현재 필터와 검색어를 기반으로 시험 목록 조회
   */
  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log('조회', { filters, search })
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] text-neutral-500">쪽지시험 관리</h1>
        <div className="mb-3">
          <FilterSection
            dropdowns={EXAM_DROPDOWNS}
            selectedValues={filters}
            onChangeFilters={handleChangeFilters}
            search={search}
            onChangeSearch={setSearch}
            onSubmit={handleSearch}
          />
        </div>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : exams.length === 0 ? (
          <EmptyState onButtonClick={createModal.modalOpen} />
        ) : (
          <ExamList
            data={exams}
            onButtonClick={createModal.modalOpen}
            onDetailClick={detailModal.modalOpen}
            onDeployClick={deployModal.modalOpen}
          />
        )}
        {detailModal.data && (
          <ExamQuestionDetailModal
            examId={detailModal.data.id}
            isOpen={detailModal.isOpen}
            onClose={detailModal.modalClose}
          />
        )}

        <ExamCreateModal
          isOpen={createModal.isOpen}
          onClose={createModal.modalClose}
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
