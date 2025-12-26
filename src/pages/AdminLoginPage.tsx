import { OzcodingLogo } from '@assets'
import { BaseInput, Button, Image } from '@components'
import { useLogin } from '@features/auth/hooks/useLogin'
import { cn } from '@utils'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // mutate 실행 -> onSuccess/onError 자동처리
    loginMutation.mutate({ email, password })
  }

  const inputStyle =
    'rounded-md border-[#bdbdbd] font-[14px] text-[#bdbdbd] w-82 h-12 tracking-[-3%] placeholder:text-sm px-2 py-1 focus:placeholder:opacity-0'

  return (
    <form onSubmit={handleSubmit} className="flex h-screen bg-primary-500/3">
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-white">
        <Image
          src={OzcodingLogo}
          alt="오즈코딩 로고"
          className="mb-4 h-6 w-45"
          loading="eager"
        />
        <p className="mb-4 text-sm">
          <span className="text-primary-500">admin 계정</span>
          <span className="text-[#000A30]">을 통해 로그인을 진행해주세요.</span>
        </p>
        <BaseInput
          className={cn(inputStyle, 'mb-3')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디 (example@gmail.com)"
        />
        <BaseInput
          className={cn(inputStyle, 'mb-3')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
        />
        <Button
          className="h-12 w-82"
          variant="primary"
          type="submit"
          disabled={loginMutation.isPending}
        >
          로그인
        </Button>
      </div>
      <div className="w-1/2" />
    </form>
  )
}
