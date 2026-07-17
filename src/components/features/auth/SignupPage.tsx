'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/commons/Input';
import { Button } from '@/components/commons/Button';
import { FormError } from '@/components/commons/FormError';
import { Body } from '@/components/commons/Typography';
import { ServiceHeader } from '@/components/commons/ServiceHeader';
import { useSignup } from '@/hooks/useSignup';

const signupSchema = z
  .object({
    loginId: z
      .string()
      .min(1, '아이디를 입력해주세요.')
      .min(4, '아이디는 최소 4자 이상이어야 합니다.')
      .max(20, '아이디는 20자 이하이어야 합니다.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[a-zA-Z]/, '영문자를 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 포함해야 합니다.')
      .regex(/[^a-zA-Z0-9]/, '특수문자를 포함해야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .min(2, '이름은 2자 이상이어야 합니다.')
      .max(8, '이름은 8자 이하이어야 합니다.'),
    brandName: z
      .string()
      .min(1, '브랜드명을 입력해주세요.')
      .max(30, '브랜드명은 30자 이하이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, isPending, serverError } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignupFormData) => signup(data);

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <ServiceHeader />
      <div className="flex flex-1 items-center justify-center py-[var(--padding-9)]">
        <div className="bg-bg-white border-border-subtler flex flex-col items-center gap-[var(--gap-8)] rounded-[var(--radius-large2)] border p-[var(--padding-9)] shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
          <Body size="large" bold className="text-text-basic">
            회원가입
          </Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex w-[360px] flex-col items-center gap-[var(--gap-8)]"
          >
            <div className="flex w-full flex-col gap-[var(--gap-7)]">
              <Input
                label="아이디"
                placeholder="아이디 입력 (4~20자)"
                required
                error={errors.loginId?.message}
                {...register('loginId')}
              />
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호 입력 (영문, 숫자, 특수문자 포함 8자 이상)"
                required
                error={errors.password?.message}
                {...register('password')}
              />
              <Input
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호 재입력해주세요."
                required
                error={errors.passwordConfirm?.message}
                {...register('passwordConfirm')}
              />
              <Input
                label="이름"
                placeholder="이름을 입력해주세요."
                required
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="브랜드명"
                placeholder="브랜드명을 입력해주세요."
                required
                error={errors.brandName?.message}
                {...register('brandName')}
              />
            </div>
            <FormError message={serverError} />
            <div className="flex w-full flex-col items-center gap-[var(--gap-4)]">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? '처리 중...' : '회원가입 완료'}
              </Button>
              <p className="text-text-disabled text-[12px] leading-[1.5] font-semibold">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="text-text-basic underline">
                  로그인하기
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
