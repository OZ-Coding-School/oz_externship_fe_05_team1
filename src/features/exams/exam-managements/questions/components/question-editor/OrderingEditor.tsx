import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd'
import { cn } from '@utils'

import { useOrdering } from '../../hooks'
import { QuestionInput } from '../../question-inputs'

type OrderingEditorProps = {
  options: string[]
  correctAnswer: number[]
  onOptionsChange: (options: string[]) => void
  onCorrectChange: (answer: number[]) => void
  disabled?: boolean
}

/**
 * 순서 배열형 정답 에디터
 * - 알파벳(A, B, C...)을 드래그 핸들로 사용
 * - 인라인 입력
 * - onClear로 삭제
 */
export default function OrderingEditor({
  options,
  correctAnswer,
  onOptionsChange,
  onCorrectChange,
  disabled = false,
}: OrderingEditorProps) {
  const {
    canAdd,
    canDelete,
    addOption,
    deleteOption,
    updateOption,
    reorder,
    getOrderedOptions,
  } = useOrdering({
    options,
    correctAnswer,
    onOptionsChange,
    onCorrectChange,
    disabled,
  })

  const orderedOptions = getOrderedOptions()

  // 드래그 완료 핸들러 - 조기 반환 블록화 및 reorder 호출 명시
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || disabled) {
      return
    }

    const fromIndex = result.source.index
    const toIndex = result.destination.index

    return reorder(fromIndex, toIndex)
  }

  // onClear 핸들러 생성 - 중괄호 사용 및 명시적 return
  const getOnClear = (optionIndex: number) => {
    if (!canDelete || disabled) {
      return undefined
    }

    return () => {
      deleteOption(optionIndex)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-1 text-lg font-semibold text-neutral-500">
        보기 입력 & 순서 지정
      </h3>
      <p className="text-sm text-neutral-300">
        알파벳을 드래그하여 순서를 변경하고, 각 보기의 내용을 입력해주세요.
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ordering-list">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                'flex flex-col gap-1 rounded-md transition-colors',
                snapshot.isDraggingOver && 'bg-primary-50'
              )}
            >
              {orderedOptions.map(({ optionIndex, orderIndex, value }) => {
                const alphabet = String.fromCharCode(65 + optionIndex)

                return (
                  <Draggable
                    key={`order-${optionIndex}`}
                    draggableId={`order-${optionIndex}`}
                    index={orderIndex}
                    isDragDisabled={disabled}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          'flex items-center gap-1',
                          snapshot.isDragging && 'opacity-90'
                        )}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className={cn(
                            'flex h-9 w-6 shrink-0 cursor-grab items-center justify-center',
                            'text-sm font-medium text-neutral-500',
                            'hover:text-primary-500',
                            disabled && 'cursor-not-allowed'
                          )}
                        >
                          {alphabet}.
                        </div>

                        <div className="flex flex-1 items-center">
                          <QuestionInput
                            mode="answer"
                            value={value}
                            onChange={(newValue) => {
                              updateOption(optionIndex, newValue)
                            }}
                            placeholder={`보기 ${alphabet} 입력`}
                            onClear={getOnClear(optionIndex)}
                            disabled={disabled}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {canAdd && !disabled && (
        <button
          type="button"
          onClick={() => {
            addOption()
          }}
          className="hover:text-primary-600 self-start text-sm text-primary-500"
        >
          + 보기 추가
        </button>
      )}

      <p className="text-xs text-primary-400">
        * 모든 보기를 입력하고 올바른 순서로 정렬해주세요.
      </p>
    </div>
  )
}
