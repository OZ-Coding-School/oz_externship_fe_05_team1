export const MOCK_COURSE_LIST = [
  {
    id: 1,
    name: '초격차 백엔드 부트캠프',
    tag: 'BE',
    thumbnail_img_url: '',
  },
  {
    id: 2,
    name: '초격차 프론트엔드 부트캠프',
    tag: 'FE',
    thumbnail_img_url: '',
  },
] as const

export const MOCK_SUBJECT_LIST = [
  {
    id: 3,
    course_id: 1,
    title: 'Python',
    status: 'active',
    thumbnail_img_url: '',
  },
  {
    id: 4,
    course_id: 2,
    title: 'React',
    status: 'active',
    thumbnail_img_url: '',
  },
  {
    id: 5,
    course_id: 2,
    title: 'Typescript',
    status: 'active',
    thumbnail_img_url: '',
  },
] as const
