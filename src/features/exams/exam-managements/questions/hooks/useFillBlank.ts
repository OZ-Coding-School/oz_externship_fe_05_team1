import { useCallback, useEffect, useMemo, useRef } from 'react'

type UseFillBlankProps = {
  prompt: string
  correctAnswer: string[]
  onCorrectChange: (answers: string[]) => void
  onBlankCountChange: (count: number) => void
}

export function useFillBlank({
  prompt,
  correctAnswer,
  onCorrectChange,
  onBlankCountChange,
}: UseFillBlankProps) {
  // 빈칸 개수 계산 (___로 표시된 부분, 3개 이상 연속 _)
  const blankCount = useMemo(() => {
    const matches = prompt.match(/_{3,}/g)

    return matches ? matches.length : 0
  }, [prompt])

  // 이전 빈칸 개수 추적
  const prevBlankCountRef = useRef(blankCount)

  // 빈칸 개수 변경 시에만 동기화
  useEffect(() => {
    // 빈칸 개수가 변경되었을 때만 실행
    if (prevBlankCountRef.current !== blankCount) {
      prevBlankCountRef.current = blankCount
      onBlankCountChange(blankCount)

      // 정답 배열 길이 조정
      const newAnswers = Array(blankCount)
        .fill('')
        .map((_, i) => correctAnswer[i] || '')

      return onCorrectChange(newAnswers)
    }
  }, [blankCount, onBlankCountChange, onCorrectChange])

  // 개별 정답 업데이트
  const updateAnswer = useCallback(
    (index: number, value: string) => {
      const newAnswers = [...correctAnswer]

      newAnswers[index] = value

      return onCorrectChange(newAnswers)
    },
    [correctAnswer, onCorrectChange]
  )

  // 지문에서 빈칸을 하이라이트한 미리보기 생성
  const getPreviewParts = useCallback(() => {
    const parts: Array<{
      type: 'text' | 'blank'
      content: string
      index?: number
    }> = []
    let lastIndex = 0
    let blankIndex = 0

    const regex = /_{3,}/g
    let match

    while ((match = regex.exec(prompt)) !== null) {
      // 빈칸 앞 텍스트
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: prompt.slice(lastIndex, match.index),
        })
      }

      // 빈칸
      parts.push({
        type: 'blank',
        content: correctAnswer[blankIndex] || `빈칸 ${blankIndex + 1}`,
        index: blankIndex,
      })

      blankIndex++
      lastIndex = match.index + match[0].length
    }

    // 마지막 텍스트
    if (lastIndex < prompt.length) {
      parts.push({
        type: 'text',
        content: prompt.slice(lastIndex),
      })
    }

    return parts
  }, [prompt, correctAnswer])

  return {
    blankCount,
    updateAnswer,
    getPreviewParts,
  }
}
