import { useCallback } from 'react'

type UseOptionsProps = {
  options: string[]
  onOptionsChange: (options: string[]) => void
  minOptions?: number
  maxOptions?: number
  disabled?: boolean
}

type UseOptionsReturn = {
  canAdd: boolean
  canDelete: boolean
  handleChange: (index: number, value: string) => void
  handleAdd: () => void
  handleDelete: (index: number) => void
  getOnClear: (index: number) => (() => void) | null
}

export function useOptions({
  options,
  onOptionsChange,
  minOptions = 2,
  maxOptions = 5,
  disabled = false,
}: UseOptionsProps): UseOptionsReturn {
  const canDelete = options.length > minOptions
  const canAdd = options.length < maxOptions

  const handleChange = useCallback(
    (index: number, value: string) => {
      const newOptions = [...options]

      newOptions[index] = value

      return onOptionsChange(newOptions)
    },
    [options, onOptionsChange]
  )

  const handleAdd = useCallback(() => {
    if (!canAdd || disabled) {
      return
    }

    return onOptionsChange([...options, ''])
  }, [options, onOptionsChange, canAdd, disabled])

  const handleDelete = useCallback(
    (index: number) => {
      if (!canDelete || disabled) {
        return
      }

      const newOptions = options.filter((_, i) => i !== index)

      return onOptionsChange(newOptions)
    },
    [options, onOptionsChange, canDelete, disabled]
  )

  const getOnClear = useCallback(
    (index: number): (() => void) | null => {
      if (!canDelete || disabled) {
        return null
      }

      return () => handleDelete(index)
    },
    [canDelete, disabled, handleDelete]
  )

  return {
    canAdd,
    canDelete,
    handleChange,
    handleAdd,
    handleDelete,
    getOnClear,
  }
}
