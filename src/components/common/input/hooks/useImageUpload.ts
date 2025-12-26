import { useEffect, useRef, useState } from 'react'

/**
 * 이미지 업로드 훅
 * @param onChange - 파일 선택 시 콜백.
 * @returns
 *  - fileInputRef: 숨겨진 <input type="file"> 요소를 제어하기 위한 ref
 *  - preview: 미리보기용 Blob URL 문자열 (없으면 null)
 *  - fileName: 선택된 파일 이름
 *  - handleOpenFile: 숨겨진 파일 입력창을 열기 위한 함수
 *  - handleFileChange: 파일 선택 시 실행되는 이벤트 핸들러
 */
export function useImageUpload(
  onChange?: (file: File | null, previewUrl: string | null) => void
) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.')

      return
    }

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    const blobUrl = URL.createObjectURL(file)

    setPreview(blobUrl)
    setFileName(file.name)
    onChange?.(file, blobUrl)
    e.target.value = ''
  }

  useEffect(() => {
    if (!preview) {
      return
    }

    return () => {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleOpenFile = () => {
    fileInputRef.current?.click()
  }

  return {
    fileInputRef,
    preview,
    fileName,
    handleOpenFile,
    handleFileChange,
  }
}
