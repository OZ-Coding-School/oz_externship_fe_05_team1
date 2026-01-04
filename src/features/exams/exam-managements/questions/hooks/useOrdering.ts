import { useCallback } from 'react'

type UseOrderingProps = {
  options: string[]
  correctAnswer: number[]
  onOptionsChange: (options: string[]) => void
  onCorrectChange: (answer: number[]) => void
  minOptions?: number
  maxOptions?: number
  disabled?: boolean
}

type UseOrderingReturn = {
  canAdd: boolean
  canDelete: boolean
  addOption: () => void
  deleteOption: (index: number) => void
  updateOption: (index: number, value: string) => void
  reorder: (fromIndex: number, toIndex: number) => void
  getOrderedOptions: () => Array<{
    optionIndex: number
    orderIndex: number
    value: string
  }>
}

/**
 * 순서 배열형 문제를 위한 훅
 * - 보기 추가/삭제/수정
 * - 드래그앤드롭 순서 변경
 */
export function useOrdering({
  options,
  correctAnswer,
  onOptionsChange,
  onCorrectChange,
  minOptions = 2,
  maxOptions = 5,
  disabled = false,
}: UseOrderingProps): UseOrderingReturn {
  const canAdd = options.length < maxOptions
  const canDelete = options.length > minOptions

  // 보기 추가
  const addOption = useCallback(() => {
    if (disabled || !canAdd) return

    const newOptions = [...options, '']
    const newOrder = [...correctAnswer, options.length]

    onOptionsChange(newOptions)
    onCorrectChange(newOrder)
  }, [
    options,
    correctAnswer,
    onOptionsChange,
    onCorrectChange,
    disabled,
    canAdd,
  ])

  // 보기 삭제
  const deleteOption = useCallback(
    (index: number) => {
      if (disabled || !canDelete) return

      const newOptions = options.filter((_, i) => i !== index)

      // 순서 배열에서 해당 인덱스 제거 + 인덱스 조정
      const newOrder = correctAnswer
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))

      onOptionsChange(newOptions)
      onCorrectChange(newOrder)
    },
    [
      options,
      correctAnswer,
      onOptionsChange,
      onCorrectChange,
      disabled,
      canDelete,
    ]
  )

  // 보기 내용 수정
  const updateOption = useCallback(
    (index: number, value: string) => {
      const newOptions = [...options]

      newOptions[index] = value
      onOptionsChange(newOptions)
    },
    [options, onOptionsChange]
  )

  // 순서 재정렬 (드래그앤드롭용)
  const reorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (disabled || fromIndex === toIndex) return

      const newOrder = [...correctAnswer]
      const [removed] = newOrder.splice(fromIndex, 1)

      newOrder.splice(toIndex, 0, removed)

      onCorrectChange(newOrder)
    },
    [correctAnswer, onCorrectChange, disabled]
  )

  // 정렬된 보기 목록 반환
  const getOrderedOptions = useCallback(
    () =>
      correctAnswer.map((optionIndex, orderIndex) => ({
        optionIndex,
        orderIndex,
        value: options[optionIndex] || '',
      })),
    [correctAnswer, options]
  )

  return {
    canAdd,
    canDelete,
    addOption,
    deleteOption,
    updateOption,
    reorder,
    getOrderedOptions,
  }
}
