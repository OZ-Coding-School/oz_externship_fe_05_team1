import { useQuestionStore } from '@stores'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function CreateQuestionPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()

  const { questions, currentIndex, setExamId, addQustion, reset } =
    useQuestionStore()

  const { saveAll, isLoading } = useSaveAllQuestions()
  const { validate } = useQuestionValidation()

  const current = Questions[currentIndex]

  useEffect(() => {
    if (!examId) {
      return
    }

    setExamId(Number(examId))
  }, [examId, setExamId])
}
