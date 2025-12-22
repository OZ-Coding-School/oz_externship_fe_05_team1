import { BaseModal } from '@components'
import {
  Body,
  type ExamQuestionResponse,
  Footer,
  Header,
  QuestionBody,
  QuestionFooter,
  Side,
  Thumbnail,
  TitleGroup,
} from '@features/exam'
import { ExamQuestionInfo } from '@mocks/examQuestionInfo'
import { useEffect, useState } from 'react'

/**
 * 시험 문제 상세 모달 컴포넌트
 * @param examId : 시험 ID
 * @param isOpen : 모달 오픈 여부
 * @param onClose : 모달 닫기 함수
 */
export default function ExamQuestionDetail({
  examId: _examId,
  isOpen,
  onClose,
}: {
  examId: number
  isOpen: boolean
  onClose: () => void
}) {
  const [exam, setExam] = useState<ExamQuestionResponse | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isOpen) return
    setExam(ExamQuestionInfo)
  }, [isOpen])

  if (!exam) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose} size="xl">
        <div className="p-6 text-center">시험 정보를 불러오는 중...</div>
      </BaseModal>
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      isBaseAllStyle
      className="bg-neutral-100"
      title={
        <Header>
          <Thumbnail src={exam.thumbnail_img_url} />
          <TitleGroup
            title={exam.examTitle}
            subject={exam.subjectName}
            total={exam.questionCount}
          />
        </Header>
      }
    >
      <div className="flex h-[500px] w-[1150px] gap-3">
        <Side>
          <div className="flex h-[229px] w-[192px] flex-col rounded-lg border border-neutral-200 bg-bg-primary p-4">
            <div className="mb-6 grid grid-cols-4 gap-2.5">
              {exam.questions.map((q, idx) => (
                <button
                  key={q.questionId}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex h-7.5 w-7.5 items-center justify-center gap-2.5 rounded-md ${
                    idx === currentIndex
                      ? 'bg-primary-300 text-text-inverse'
                      : 'bg-primary-light text-primary-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button className="mt-auto w-full rounded border border-error py-2 text-center text-sm text-error">
              시험 삭제
            </button>
          </div>
        </Side>
        <Body>
          <QuestionBody
            exam={exam}
            currentIndex={currentIndex}
            onPrev={() => setCurrentIndex((v) => v - 1)}
            onNext={() => setCurrentIndex((v) => v + 1)}
          />
        </Body>
      </div>
      <Footer>
        <QuestionFooter
          currentIndex={currentIndex}
          total={exam.questionCount}
          onClose={onClose}
        />
      </Footer>
    </BaseModal>
  )
}
