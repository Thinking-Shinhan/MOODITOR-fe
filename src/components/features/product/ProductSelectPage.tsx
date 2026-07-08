'use client';

import { useProducts } from '@/hooks/useProducts';

export const ProductSelectPage = () => {
  // TODO: 임시 호출 예시. 실제 필터 UI 연결 후 제거
  const { data, isLoading, isError } = useProducts({
    // category: 'top',
    // color: '브라운',
    // gender: 'F',
    // keyword: '드라이',
    page: 0,
    size: 20,
  });

  return (
    <div>
      상품 선택 페이지
      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>상품을 불러오지 못했습니다.</p>}
      {data && (
        <ul>
          {data.products.content.map((product) => (
            <li key={product.id}>
              {product.name} ({product.color})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
