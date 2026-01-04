import { XbuttonIcon } from '@assets'
import { useImageUpload } from '@components'
import { cn } from '@utils'

import UploadIcon from './UploadIcon'

type LogoUploadProps = {
  onChange?: (file: File | null, previewUrl: string | null) => void
  initialPreview?: string
}

/**
 * 로고 업로드
 * @param onChange - 파일 선택 시 콜백
 * @param initialPreview - 최초 이미지파일 URL
 */
export default function LogoUpload({
  onChange,
  initialPreview,
  ...props
}: LogoUploadProps) {
  const {
    fileInputRef,
    preview,
    fileName,
    handleOpenFile,
    handleFileChange,
    clearFile,
  } = useImageUpload(onChange)

  const logoPreview = preview ?? initialPreview ?? null
  const shortenFileName = (name: string, max = 20) =>
    name.length > max ? `${name.slice(0, 10)}...${name.slice(-7)}` : name

  // 이미지 삭제 핸들러
  const handleRemove = () => {
    clearFile()
    onChange?.(null, null)
  }

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="relative flex h-33 w-35">
        <button
          className={cn(
            'flex h-full w-full cursor-pointer items-center justify-center border',
            'border-neutral-300 bg-neutral-200'
          )}
          onClick={handleOpenFile}
        >
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="logo preview"
              className="object-cover p-4"
            />
          ) : (
            <UploadIcon />
          )}
        </button>
        {logoPreview && (
          <button
            onClick={handleRemove}
            className={cn(
              'absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center',
              'rounded-full bg-neutral-500 text-white hover:bg-neutral-600'
            )}
          >
            <XbuttonIcon className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[14px] text-neutral-300">
          96 x 96 사이즈로 등록하세요.
        </span>

        {shortenFileName(fileName) && (
          <span
            className="min-w-0 flex-1 overflow-hidden text-[14px] text-ellipsis whitespace-nowrap text-neutral-400 underline"
            title={shortenFileName(fileName)}
          >
            {shortenFileName(fileName)}
          </span>
        )}

        <button
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
        {...props}
      />
    </div>
  )
}
