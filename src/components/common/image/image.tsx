import { cn } from '@utils'
import { useEffect, useState } from 'react'

type ImageProps = {
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  src?: string
}

const Image = ({
  alt,
  className,
  loading = 'lazy',
  onError,
  src,
  ...props
}: ImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageSrc =
    isError || !src ? 'https://placehold.co/400x400?text=No+Image' : src

  useEffect(() => {
    setIsError(false)
  }, [src])

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (isError) {
      return
    }

    setIsError(true)

    if (onError) {
      onError(e)
    }
  }

  return (
    <img
      alt={alt}
      className={cn(className)}
      loading={loading}
      onError={handleError}
      src={imageSrc}
      {...props}
    />
  )
}

export default Image
