import { ArrowLeftIcon } from '@assets'
import { Button } from '@components'

type Props = {
  onGoToList: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function CreateQuestionHeader({
  onGoToList,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
        쪽지시험 관리
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="transparency"
          size="sm"
          onClick={onGoToList}
          className="-ml-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          목록으로 이동
        </Button>
        <div className="flex justify-end gap-2">
          <Button variant="success" size="md" onClick={onEdit}>
            수정
          </Button>
          <Button variant="danger" size="md" onClick={onDelete}>
            삭제
          </Button>
        </div>
      </div>
    </>
  )
}
