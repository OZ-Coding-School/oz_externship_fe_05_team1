import { BookIcon, UserIcon } from '@assets'
import { ROUTES_PATHS } from '@constants'

export const EXAMS_MENU_ITEMS = [
  {
    path: ROUTES_PATHS.EXAM,
    label: '쪽지시험 관리',
  },
  {
    path: '/exams/deployments',
    label: '배포 내역 관리',
  },
  {
    path: '/exams/submissions',
    label: '응시 내역 관리',
  },
]

export const ADMIN_MENU_ITEMS = [
  {
    path: '/accounts/students',
    label: '수강생 관리',
  },
  {
    path: '/accounts/managers',
    label: '관계자 관리',
  },
  {
    path: '/accounts/student-enrollments',
    label: '수강생 등록 신청',
  },
  {
    path: '/accounts/withdrawals',
    label: '회원 탈퇴 관리',
  },
]

export const SIDE_MENU_LIST = [
  {
    id: 'admin',
    label: '회원관리',
    icon: UserIcon,
    items: ADMIN_MENU_ITEMS,
  },
  {
    id: 'exams',
    label: '쪽지시험 관리',
    icon: BookIcon,
    items: EXAMS_MENU_ITEMS,
  },
]
