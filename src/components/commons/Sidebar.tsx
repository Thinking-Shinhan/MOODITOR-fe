'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useLogout } from '@/hooks/useLogout';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { prefetchImageGenerationAssets } from '@/hooks/usePrefetchImageGenerationAssets';
import { prefetchLibraryFolders } from '@/hooks/usePrefetchLibraryFolders';
import { Label } from '@/components/commons/Typography';
import { AlertModal } from '@/components/commons/AlertModal';
import {
  Home,
  Library,
  LayoutTemplate,
  LogOut,
  PanelLeft,
  Wand2,
  PanelRight,
} from 'lucide-react';

type NavItemConfig = {
  href: string;
  icon: React.ElementType;
  label: string;
  loginRequiredMessage?: string;
  onHoverPrefetch?: (queryClient: QueryClient) => void;
};

const NAV_ITEMS: NavItemConfig[] = [
  { href: '/', icon: Home, label: '홈' },
  {
    href: '/image-generate',
    icon: Wand2,
    label: '이미지 만들기',
    loginRequiredMessage: '로그인 후 브랜드에 맞는 이미지를 제작해 보세요.',
    onHoverPrefetch: prefetchImageGenerationAssets,
  },
  {
    href: '/detail-edit',
    icon: LayoutTemplate,
    label: '상세페이지 편집',
    loginRequiredMessage: '로그인 후 브랜드에 맞는 상세페이지를 제작해 보세요.',
  },
  {
    href: '/library',
    icon: Library,
    label: '라이브러리',
    loginRequiredMessage: '로그인 후 라이브러리를 이용해 보세요.',
    onHoverPrefetch: prefetchLibraryFolders,
  },
];

const HIDDEN_SIDEBAR_PATHS = [
  '/detail-edit/preview',
  '/login',
  '/signup',
  '/onboarding',
];

export const Sidebar = () => {
  const {
    isCollapsed: collapsed,
    toggle: toggleCollapsed,
    _hasHydrated,
  } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { logout, isPending: isLoggingOut } = useLogout();
  const { isAuthenticated } = useIsAuthenticated();
  const [loginRequiredMessage, setLoginRequiredMessage] = useState<
    string | null
  >(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  if (!_hasHydrated || HIDDEN_SIDEBAR_PATHS.includes(pathname)) return null;

  const handleNavClick =
    (message?: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (message && isAuthenticated === false) {
        event.preventDefault();
        setLoginRequiredMessage(message);
      }
    };

  const handleNavHover =
    (onHoverPrefetch?: (queryClient: QueryClient) => void) => () => {
      if (onHoverPrefetch && isAuthenticated === true) {
        onHoverPrefetch(queryClient);
      }
    };

  return (
    <aside
      className={[
        'bg-bg-white border-border-subtler flex h-screen shrink-0 flex-col overflow-hidden border-r px-[var(--padding-7)] py-[var(--padding-7)]',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-[76px]' : 'w-[220px]',
      ].join(' ')}
    >
      {/* logo + toggle */}
      <div
        className={[
          'mb-[37px] flex shrink-0 items-center',
          collapsed ? 'justify-center' : '',
        ].join(' ')}
      >
        {!collapsed && (
          <div className="flex min-w-0 flex-1 items-center gap-[var(--gap-3)]">
            <img
              src="/assets/icons/mooditor-icon.svg"
              alt=""
              className="h-6 w-6 shrink-0"
            />
            <span className="text-text-border text-[16px] leading-[1.5] font-bold whitespace-nowrap">
              MOODITOR
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? '사이드바 열기' : '사이드바 닫기'}
          className="text-icon-disabled-on hover:text-icon-gray flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center transition-colors"
        >
          {collapsed ? <PanelRight size={16} /> : <PanelLeft size={16} />}
        </button>
      </div>

      {/* navigation items */}
      <nav className="flex flex-1 flex-col gap-[var(--gap-4)]">
        {NAV_ITEMS.map(
          ({
            href,
            icon: Icon,
            label,
            loginRequiredMessage: message,
            onHoverPrefetch,
          }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={handleNavClick(message)}
                onMouseEnter={handleNavHover(onHoverPrefetch)}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center rounded-[var(--radius-small2)] transition-colors',
                  collapsed
                    ? 'mx-auto h-[37px] w-[37px] justify-center'
                    : 'w-full gap-[var(--gap-4)] px-[var(--gap-5)] py-[var(--size-height-2)]',
                  isActive
                    ? 'bg-btn-secondary-fill-hovered text-text-primary-basic'
                    : 'text-text-disabled-on hover:bg-btn-tertiary-fill-hovered hover:text-text-subtle',
                ].join(' ')}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <Icon size={16} />
                </span>
                {!collapsed && (
                  <Label size="small" className="whitespace-nowrap">
                    {label}
                  </Label>
                )}
              </Link>
            );
          },
        )}
      </nav>

      {/* logout */}
      <div>
        <button
          type="button"
          onClick={() => setIsLogoutConfirmOpen(true)}
          disabled={isLoggingOut}
          aria-label="로그아웃"
          className={[
            'flex cursor-pointer items-center rounded-[var(--radius-small2)] transition-colors',
            'text-text-disabled-on hover:bg-btn-tertiary-fill-hovered hover:text-text-subtle',
            'disabled:cursor-not-allowed disabled:opacity-50',
            collapsed
              ? 'mx-auto h-[37px] w-[37px] justify-center'
              : 'w-full gap-[var(--gap-4)] px-[var(--gap-5)] py-[var(--size-height-2)]',
          ].join(' ')}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <LogOut size={16} />
          </span>
          {!collapsed && (
            <Label size="small" className="whitespace-nowrap">
              로그아웃
            </Label>
          )}
        </button>
      </div>

      <AlertModal
        open={isLogoutConfirmOpen}
        title="로그아웃하시겠습니까?"
        description="다시 이용하려면 로그인이 필요해요."
        confirmText="확인"
        cancelText="취소"
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          logout();
        }}
        onCancel={() => setIsLogoutConfirmOpen(false)}
      />

      <AlertModal
        open={loginRequiredMessage !== null}
        title="로그인이 필요해요."
        description={loginRequiredMessage ?? ''}
        confirmText="확인"
        onConfirm={() => {
          setLoginRequiredMessage(null);
          router.push('/login');
        }}
        onCancel={() => setLoginRequiredMessage(null)}
      />
    </aside>
  );
};
