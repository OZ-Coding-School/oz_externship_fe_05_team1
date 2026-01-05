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
    thumbnail_img_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png',
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
  {
    id: 9,
    course_id: 1,
    title: 'Django',
    status: 'active',
    thumbnail_img_url:
      'https://storage.educast.com/image/9a0ecd1f-ebf5-4e99-98e4-5edfe7949075/1000.jpg',
  },
  {
    id: 10,
    course_id: 1,
    title: 'JavaScript',
    status: 'active',
    thumbnail_img_url:
      'https://velog.velcdn.com/images/cocowonji/post/e8f90515-cce9-4e57-996b-a4470cae97ac/image.png',
  },
  {
    id: 11,
    course_id: 1,
    title: 'faseAPI',
    status: 'active',
    thumbnail_img_url:
      'https://images.seeklogo.com/logo-png/49/1/fastapi-logo-png_seeklogo-499530.png',
  },
] as const
