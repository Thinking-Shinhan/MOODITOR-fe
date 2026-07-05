'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/stores/sidebarStore';
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
};

const NAV_ITEMS: NavItemConfig[] = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/image-generate', icon: Wand2, label: '이미지 만들기' },
  { href: '/detail-edit', icon: LayoutTemplate, label: '상세페이지 편집' },
  { href: '/library', icon: Library, label: '라이브러리' },
];

export const Sidebar = () => {
  const {
    isCollapsed: collapsed,
    toggle: toggleCollapsed,
    _hasHydrated,
  } = useSidebarStore();
  const pathname = usePathname();

  if (!_hasHydrated) return null;

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
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* 추후 변경 */}
            <div className="bg-icon-gray h-6 w-6 shrink-0 rounded-[var(--radius-xsmall2)]" />
            <span className="text-text-border text-[16px] leading-[1.5] font-bold whitespace-nowrap">
              SERVICE
            </span>
          </div>
        )}
        {/* 아이콘 뒤에 네모 추가 필요 */}
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
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
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
                <span className="text-[14px] leading-[1.5] whitespace-nowrap">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* logout */}
      <div>
        <button
          type="button"
          className={[
            'flex cursor-pointer items-center rounded-[var(--radius-small2)] transition-colors',
            'text-text-disabled-on hover:bg-btn-tertiary-fill-hovered hover:text-text-subtle',
            collapsed
              ? 'mx-auto h-[37px] w-[37px] justify-center'
              : 'w-full gap-[var(--gap-4)] px-[var(--gap-5)] py-[var(--size-height-2)]',
          ].join(' ')}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <LogOut size={16} />
          </span>
          {!collapsed && (
            <span className="text-[14px] leading-[1.5] whitespace-nowrap">
              로그아웃
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
