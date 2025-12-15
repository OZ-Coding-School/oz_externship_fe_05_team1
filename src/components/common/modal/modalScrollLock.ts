let lockCount = 0

/**
 * lockCount 카운트 추가
 * 모달 활성화 시 배경 스크롤을 막음
 */
export function lockScroll() {
  lockCount++

  if (lockCount === 1) {
    document.body.style.overflow = 'hidden'
  }
}

/**
 * lockCount 카운트 감소
 * 모달 닫힐 시 배경 스크롤을 허용
 */
export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)

  if (lockCount === 0) {
    document.body.style.overflow = ''
  }
}
