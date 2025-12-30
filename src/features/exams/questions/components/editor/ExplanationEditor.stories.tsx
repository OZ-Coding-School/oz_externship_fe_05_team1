import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExplanationEditor } from '@features/exams/'
import { useState } from 'react'

const meta: Meta<typeof ExplanationEditor> = {
  title: 'Features/Exams/ExplanationEditor',
  component: ExplanationEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-125">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ExplanationEditor>

// 인터랙션 래퍼
function ExplanationEditorWithState() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <ExplanationEditor value={value} onChange={setValue} />
      <div className="rounded bg-gray-100 p-2">
        <p className="text-xs text-gray-500">입력된 마크다운:</p>
        <pre className="mt-1 text-xs">{value || '(비어있음)'}</pre>
      </div>
    </div>
  )
}

/** 빈 상태 */
export const Empty: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

/** 마크다운 내용 있음 */
export const WithMarkdown: Story = {
  args: {
    value: `## 정답 해설

정답은 **C**입니다.

공변성(Covariance)은 상위 타입-하위 타입 관계에서 같은 방향으로 타입 호환이 허용되는 것을 의미합니다.

### 예시
\`\`\`typescript
type Animal = { name: string }
type Dog = { name: string; breed: string }

// Dog는 Animal의 하위 타입
const dogs: Dog[] = [{ name: 'Rex', breed: 'German Shepherd' }]
const animals: Animal[] = dogs // OK - 공변성
\`\`\`
`,
    onChange: () => {},
  },
}

/** 간단한 내용 */
export const SimpleContent: Story = {
  args: {
    value: '정답은 **3번**입니다. React는 라이브러리입니다.',
    onChange: () => {},
  },
}

/** 인터랙션 가능 */
export const Interactive: Story = {
  render: () => <ExplanationEditorWithState />,
}
