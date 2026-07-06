'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/commons/Input';
import { Button } from '@/components/commons/Button';
import { FormError } from '@/components/commons/FormError';
import { useLogin } from '@/hooks/useLogin';

const loginSchema = z.object({
  loginId: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isPending, serverError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="bg-bg-white border-border-subtler w-full max-w-sm rounded-(--radius-large2) border p-[var(--padding-9)]">
        <h1 className="text-text-border mb-[var(--gap-7)] text-center text-[20px] leading-[1.5] font-bold">
          로그인
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-[var(--gap-5)]"
        >
          <Input
            label="아이디"
            placeholder="아이디 입력"
            required
            error={errors.loginId?.message}
            {...register('loginId')}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            required
            error={errors.password?.message}
            {...register('password')}
          />
          <FormError message={serverError} />
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={isPending}
          >
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <p className="text-text-subtler mt-[var(--gap-5)] text-center text-[14px] leading-[1.5]">
          계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-text-primary-basic hover:text-btn-primary-hovered font-semibold"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
