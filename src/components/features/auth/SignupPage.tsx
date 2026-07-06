'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/commons/Input';
import { Button } from '@/components/commons/Button';
import { FormError } from '@/components/commons/FormError';
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
    <div className="flex h-full items-center justify-center py-[var(--padding-9)]">
      <div className="bg-bg-white border-border-subtler w-full max-w-sm rounded-(--radius-large2) border p-[var(--padding-9)]">
        <h1 className="text-text-border mb-[var(--gap-7)] text-center text-[20px] leading-[1.5] font-bold">
          회원가입
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-[var(--gap-5)]"
        >
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
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            required
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            required
            error={errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
          />
          <Input
            label="이름"
            placeholder="이름 입력 (2~8자)"
            required
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="브랜드명"
            placeholder="브랜드명 입력"
            required
            error={errors.brandName?.message}
            {...register('brandName')}
          />
          <FormError message={serverError} />
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={isPending}
          >
            {isPending ? '처리 중...' : '회원가입'}
          </Button>
        </form>
        <p className="text-text-subtler mt-[var(--gap-5)] text-center text-[14px] leading-[1.5]">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-text-primary-basic hover:text-btn-primary-hovered font-semibold"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
