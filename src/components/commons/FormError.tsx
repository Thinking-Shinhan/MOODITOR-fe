interface FormErrorProps {
  message: string | null;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-5 text-text-danger rounded-(--radius-medium1) px-[var(--padding-4)] py-[var(--size-height-2)] text-center text-[14px] leading-[1.5]">
      {message}
    </div>
  );
};
