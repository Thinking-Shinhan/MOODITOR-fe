'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/commons/Input';
import { Button } from '@/components/commons/Button';
import { FormError } from '@/components/commons/FormError';
import { Body } from '@/components/commons/Typography';
import { ServiceHeader } from '@/components/commons/ServiceHeader';
import { useLogin } from '@/hooks/useLogin';

const loginSchema = z.object({
  loginId: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
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
    <div className="flex h-full min-h-screen w-full flex-col">
      <ServiceHeader />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-bg-white border-border-subtler flex flex-col items-center gap-[var(--gap-8)] rounded-[var(--radius-large2)] border p-[var(--padding-9)] shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
          <Body size="large" bold className="text-text-basic">
            로그인
          </Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex w-[360px] flex-col items-center gap-[var(--gap-8)]"
          >
            <div className="flex w-full flex-col gap-[var(--gap-7)]">
              <Input
                label="아이디"
                placeholder="아이디를 입력해주세요."
                required
                error={errors.loginId?.message}
                {...register('loginId')}
              />
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                required
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
            <FormError message={serverError} />
            <div className="flex w-full flex-col gap-[var(--gap-4)]">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                loading={isPending}
                className="w-full"
              >
                {isPending ? '로그인 중...' : '로그인'}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="medium"
                onClick={() => router.push('/signup')}
                className="w-full"
              >
                회원가입
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
