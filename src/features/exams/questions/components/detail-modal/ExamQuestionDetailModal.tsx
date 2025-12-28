import type { ReactNode } from 'react'

import { BaseModal, Image } from '@components'
import {
  ExamDeploymentsModal,
  ExamQuestionDetailBody,
  ExamQuestionDetailFooter,
  ExamQuestionDetailSide,
  type ExamQuestionResponse,
} from '@features/exams'
import { ExamQuestionInfo } from '@mocks'
import { useEffect, useState } from 'react'

type HeaderProps = {
  children: ReactNode
}

/**
 * Header 컴포넌트
 * @param children : ReactNode
 */
const Header = ({ children }: HeaderProps) => (
  <div className="flex items-center gap-3 bg-bg-tertiary">{children}</div>
)

type TitleGroupProps = {
  title: string
  subject: string
  total: number
}

/**
 * TitleGroup 컴포넌트
 * @param title : 시험 제목
 * @param subject : 과목명
 * @param total : 총 문제 수
 */
const TitleGroup = ({ title, subject, total }: TitleGroupProps) => (
  <div className="flex flex-col leading-tight">
    <span className="flex items-center gap-2 text-[16px] font-semibold text-neutral-400">
      {title}
    </span>
    <span className="text-[14px] text-neutral-400">
      과목: {subject} &nbsp;문제 수: {total}
    </span>
  </div>
)

type ThumbnailProps = {
  src?: string | null
}

/**
 * Thumbnail 컴포넌트
 * @param src : 이미지 경로
 */
const Thumbnail = ({ src }: ThumbnailProps) => {
  const fallback = '/images/default-thumbnail.png'
  const safeSrc = src && src.trim() !== '' ? src : fallback

  return (
    <Image
      src={safeSrc}
      alt="thumbnail"
      className="h-9 w-9 rounded-md bg-neutral-200 object-cover"
      loading="lazy"
    />
  )
}

type ExamQuestionDetailSideProps = {
  children: ReactNode
}

/**
 * Side 컴포넌트
 * @param children : ReactNode
 */
const Side = ({ children }: ExamQuestionDetailSideProps) => (
  <aside className="flex flex-col overflow-auto bg-bg-tertiary px-6">
    {children}
  </aside>
)

type BodyProps = {
  children: ReactNode
}

/**
 * Body 컴포넌트
 * @param children : ReactNode
 */
const Body = ({ children }: BodyProps) => (
  <section className="flex flex-1 flex-col overflow-auto rounded-lg border border-neutral-200 bg-bg-primary p-8">
    {children}
  </section>
)

type FooterProps = {
  children: ReactNode
}

/**
 * Footer 컴포넌트
 * @param children : ReactNode
 */
const Footer = ({ children }: FooterProps) => (
  <div className="mt-3 items-center justify-between bg-bg-tertiary py-3">
    {children}
  </div>
)

type ExamQuestionDetailProps = {
  examId: number
  isOpen: boolean
  onClose: () => void
}

/**
 * 시험 문제 상세 모달 컴포넌트
 * @param examId : 시험 ID
 * @param isOpen : 모달 오픈 여부
 * @param onClose : 모달 닫기 함수
 */
export default function ExamQuestionDetailModal({
  examId,
  isOpen,
  onClose,
}: ExamQuestionDetailProps) {
  const [exam, setExam] = useState<ExamQuestionResponse | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeploymentsOpen, setIsDeploymentsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setExam(ExamQuestionInfo)
  }, [isOpen])

  if (!exam) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose} size="xxl">
        <div className="p-6 text-center">시험 정보를 불러오는 중...</div>
      </BaseModal>
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      containerClassName="bg-neutral-100"
      title={
        <ExamQuestionDetailModal.Header>
          <Thumbnail src={exam.thumbnailImgUrl} />
          <TitleGroup
            title={exam.examTitle}
            subject={exam.subjectName}
            total={exam.questionCount}
          />
        </ExamQuestionDetailModal.Header>
      }
    >
      <div className="flex h-125 w-287.5 gap-3 pl-3">
        <ExamQuestionDetailModal.Side>
          <ExamQuestionDetailSide
            questions={exam.questions}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
            examId={examId}
          />
        </ExamQuestionDetailModal.Side>
        <ExamQuestionDetailModal.Body>
          <ExamQuestionDetailBody
            exam={exam}
            currentIndex={currentIndex}
            onPrev={() => setCurrentIndex((v) => v - 1)}
            onNext={() => setCurrentIndex((v) => v + 1)}
          />
        </ExamQuestionDetailModal.Body>
      </div>
      <ExamQuestionDetailModal.Footer>
        <ExamQuestionDetailFooter
          currentIndex={currentIndex}
          total={exam.questionCount}
          openDeploymentsModal={() => setIsDeploymentsOpen(true)}
          onClose={() => setIsDeploymentsOpen(false)}
        />
        <ExamDeploymentsModal
          examName={exam.examTitle}
          subjectName={exam.subjectName}
          isOpen={isDeploymentsOpen}
          onClose={() => setIsDeploymentsOpen(false)}
        />
      </ExamQuestionDetailModal.Footer>
    </BaseModal>
  )
}

Header.Thumbnail = Thumbnail
Header.TitleGroup = TitleGroup
ExamQuestionDetailModal.Header = Header
ExamQuestionDetailModal.Body = Body
ExamQuestionDetailModal.Side = Side
ExamQuestionDetailModal.Footer = Footer
