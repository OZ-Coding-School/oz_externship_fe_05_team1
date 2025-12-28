import { type DropdownConfig, FilterSection } from '@components'
import {
  EmptyState,
  type Exam,
  ExamCreateModal,
  ExamList,
  ExamQuestionDetailModal,
} from '@features/exams'
import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'
import { useState } from 'react'

const EXAM_DROPDOWNS: DropdownConfig[] = [
  { key: 'course', items: COURSE_LIST_DROPDOWN, placeholder: '과정' },
  { key: 'subject', items: SUBJECT_LIST_DROPDOWN, placeholder: '과목' },
]

type ExamManagementPageProps = {
  initialExamInfo?: Exam[]
}

/**
 * 쪽지시험 관리 페이지
 * - 필터, 검색, 시험 목록/빈 상태를 관리하는 컨테이너 컴포넌트
 * - 시험 데이터 유무에 따라 EmptyState 또는 ExamList 렌더링
 * - 스토리북 테스트를 위해 initialInfo = [] 추가
 */
export default function ExamManagementPage({
  initialExamInfo = [],
}: ExamManagementPageProps) {
  // TODO: API 연동 시 useQuery 등으로 내부에서 시험 목록 fetch 예정
  const [data, _setData] = useState<Exam[]>(initialExamInfo)
  const [filters, setFilters] = useState<Record<string, string>>({
    course: '',
    subject: '',
  })
  const [search, setSearch] = useState('')
  const [isExamCreateOpen, setIsExamCreateOpen] = useState(false)

  /**
   * 문제 자세히보기 모달 상태관리
   */
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  /**
   * 쪽지시험 자세히보기 모달 열기
   * @param exam - 시험 정보
   */
  const handleDetailModalOpen = (exam: Exam) => {
    setSelectedExam(exam)
    setIsDetailOpen(true)
  }

  /**
   * 쪽지시험 자세히보기 모달 닫기
   */
  const handleDetailModalClose = () => {
    setIsDetailOpen(false)
    setSelectedExam(null)
  }

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

  /**
   * 시험 생성 버튼 클릭 핸들러
   * - 시험 생성 페이지로 이동 또는 모달 오픈
   */
  const handleCreate = () => {
    // eslint-disable-next-line no-console
    console.log('시험 생성하기')
    setIsExamCreateOpen(true)
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
        {data.length === 0 ? (
          <EmptyState onButtonClick={handleCreate} />
        ) : (
          <ExamList
            data={data}
            onButtonClick={handleCreate}
            onDetailClick={handleDetailModalOpen}
          />
        )}
        {isDetailOpen && selectedExam && (
          <ExamQuestionDetailModal
            examId={selectedExam.id}
            isOpen={isDetailOpen}
            onClose={handleDetailModalClose}
          />
        )}

        <ExamCreateModal
          isOpen={isExamCreateOpen}
          onClose={() => setIsExamCreateOpen(false)}
        />
      </div>
    </section>
  )
}
