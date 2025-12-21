import { create } from 'zustand'

type ExamState = {
  title: string
  course: string
  subject: string
  type: string
  options: string[]
  logoUrl: string | null

  // actions
  setTitle: (title: string) => void
  setCourse: (course: string) => void
  setSubject: (subject: string) => void
  setType: (type: string) => void
  setOptions: (options: string[]) => void
  setLogoUrl: (url: string | null) => void
  reset: () => void
}

const initialState = {
  title: '',
  course: '',
  subject: '',
  type: '',
  options: [],
  logoUrl: null,
}

export const useExamStore = create<ExamState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setCourse: (course) => set({ course }), // 대문자 C
  setSubject: (subject) => set({ subject }),
  setType: (type) => set({ type }),
  setOptions: (options) => set({ options }),
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  reset: () => set(initialState),
}))
