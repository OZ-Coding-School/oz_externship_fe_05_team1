import { useImageUpload } from '@components'

import UploadIcon from './UploadIcon'

type LogoUploadProps = {
  onChange?: (file: File | null) => void
}

/**
 * 로고 업로드
 * @param onChange - 파일 선택 시 콜백
 */
export default function LogoUpload({ onChange }: LogoUploadProps) {
  const { fileInputRef, preview, fileName, handleOpenFile, handleFileChange } =
    useImageUpload(onChange)

  return (
    <div className="flex flex-col justify-center gap-3">
      <button
        className="flex h-33 w-35 cursor-pointer items-center justify-center border border-neutral-300 bg-neutral-200"
        onClick={handleOpenFile}
      >
        {preview ? (
          <img src={preview} alt="logo preview" className="object-cover p-4" />
        ) : (
          <UploadIcon />
        )}
      </button>
      <div className="flex items-center gap-3">
        <span className="text-[14px] text-neutral-300">
          96 x 96 사이즈로 등록하세요.
        </span>

        {fileName && (
          <span className="text-neutral-400 underline">{fileName}</span>
        )}

        <button
          type="button"
          className="rounded border border-neutral-200 px-3 py-1 text-[14px] text-neutral-400"
          onClick={handleOpenFile}
        >
          파일첨부
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
