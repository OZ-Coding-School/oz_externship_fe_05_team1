import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '@features/exams'
import { useQuestionStore } from '@stores'

import type { Question, QuestionType } from '../types'

import CreateOx from './question-types/CreateOX'

/**
 * 문제 편집기
 * 현재 선택된 문제의 유형, 내용, 정답, 해설을 편집
 */
export default function QuestionEditor() {
  const { questions, currentIndex, updateQuestion } = useQuestionStore()

  // 현재 편집 중인 문제 (좌측 Nav에서 선택된 문제)
  const current = questions[currentIndex]

  if (!current) {
    return (
      <div className="p6 flex flex-1 items-center justify-center rounded-lg border border-primary-100">
        <p className="text-neutral-400">문제를 추가해주세요.</p>
      </div>
    )
  }

  /**
   * 현재 문제의 특정 필드 업데이트
   * @param updates - 변경할 필드들 (예: { question: '새 문제' })
   */
  const handleUpdate = (updates: Partial<Question>) => {
    updateQuestion(currentIndex, updates)
  }

  /**
   * 문제 유형 변경 시 해당 유형의 기본값으로 초기화
   * @param type - 변경할 문제 유형
   */
  const handleTypeChange = (type: QuestionType) => {
    if (type === 'ox') {
      handleUpdate({
        type,
        options: null,
        blank_count: null,
        correct_answer: true,
        prompt: '',
      })

      return
    }

    // TODO: 다른 유형 기본값 추가
    handleUpdate({ type })
  }

  /**
   * 문제 유형에 따라 다른 정답 입력 컴포넌트 렌더링
   * - ox: CreateOx (O/X 선택)
   * - TODO: 객관식, 순서정렬, 단답형, 빈칸채우기
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderAnswerEditor = () => {
    if (current.type === 'ox') {
      return (
        <CreateOx
          value={current.correct_answer as boolean}
          onChange={(value) => handleUpdate({ correct_answer: value })}
        />
      )
    }

    return (
      <section>
        <QuestionTypeSelect
          value={current.type}
          onChange={handleTypeChange}
          className="text-md border border-neutral-200 text-neutral-400"
        />

        <div>
          <div>
            <QuestionInput
              value={current.question}
              onChange={(value) => handleUpdate({ question: value })}
            />
            <PointSelect
              value={current.point}
              onChange={(point) => handleUpdate({ point })}
            />
          </div>

          <div>
            <div>{renderAnswerEditor()}</div>
          </div>

          <ExplanationEditor
            value={current.explanation}
            onChange={(explanation) => handleUpdate({ explanation })}
          />
        </div>
      </section>
    )
  }
}
