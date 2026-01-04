import { useCallback } from 'react'

type SigleAnswerProps = {
  multiple: false
  correctAnswer: number
  onCorrectChange: (answer: number) => void
  disabled?: boolean
}

type MultipleAnswerProps = {
  multiple: true
  correctAnswer: number[]
  onCorrectChange: (answer: number[]) => void
  disabled?: boolean
}

type UseCorrectAnswerProps = SigleAnswerProps | MultipleAnswerProps

type UseCorrectAnswerReturn = {
  isCorrect: (index: number) => boolean
  handleToggle: (index: number) => void
  adjustAfterDelete: (deletedIndex: number) => void
}

export function useCorrectAnswer(
  props: UseCorrectAnswerProps
): UseCorrectAnswerReturn {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { multiple, correctAnswer, onCorrectChange, disabled = false } = props

  const isCorrect = useCallback(
    (index: number): boolean => {
      if (multiple) {
        return (correctAnswer as number[]).includes(index)
      }

      return correctAnswer === index
    },
    [multiple, correctAnswer]
  )

  const handleToggle = useCallback(
    (index: number) => {
      if (disabled) {
        return
      }

      if (multiple) {
        const current = correctAnswer as number[]
        const isAlreadySelected = current.includes(index)

        if (isAlreadySelected && current.length > 1) {
          ;(onCorrectChange as (answer: number[]) => void)(
            current.filter((i) => i !== index)
          )

          return
        }

        if (!isAlreadySelected) {
          ;(onCorrectChange as (answer: number[]) => void)([...current, index])
        }

        return
      }

      ;(onCorrectChange as (answer: number) => void)(index)
    },
    [multiple, correctAnswer, onCorrectChange, disabled]
  )

  const adjustAfterDelete = useCallback(
    (deletedIndex: number) => {
      if (multiple) {
        const current = correctAnswer as number[]
        const adjusted = current
          .filter((i) => i !== deletedIndex)
          .map((i) => {
            if (i > deletedIndex) {
              return i - 1
            }

            return i
          })

        ;(onCorrectChange as (answer: number[]) => void)(
          adjusted.length > 0 ? adjusted : [0]
        )

        return
      }

      const current = correctAnswer as number

      if (current === deletedIndex) {
        ;(onCorrectChange as (answer: number) => void)(0)

        return
      }

      if (current > deletedIndex) {
        ;(onCorrectChange as (answer: number) => void)(current - 1)
      }
    },
    [multiple, correctAnswer, onCorrectChange]
  )

  return {
    isCorrect,
    handleToggle,
    adjustAfterDelete,
  }
}
