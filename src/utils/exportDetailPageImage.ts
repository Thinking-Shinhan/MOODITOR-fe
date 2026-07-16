import { getStageRef } from '@/components/features/detail/stageRefRegistry';
import type { PlacedTemplate } from '@/stores/detailCanvasStore';
import type { DetailTemplateType } from '@/types/template';

const CANVAS_WIDTH = 879;

const getBlockHeight = (
  template: PlacedTemplate,
  templateHeights: Record<DetailTemplateType, number>,
) => getStageRef(template.id)?.height() ?? templateHeights[template.type];

export const exportDetailPageImage = (
  placedTemplates: PlacedTemplate[],
  templateHeights: Record<DetailTemplateType, number>,
  pixelRatio = 1,
): Promise<Blob> => {
  const totalHeight = placedTemplates.reduce(
    (sum, template) => sum + getBlockHeight(template, templateHeights),
    0,
  );

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = CANVAS_WIDTH * pixelRatio;
  outputCanvas.height = totalHeight * pixelRatio;
  const ctx = outputCanvas.getContext('2d');

  if (!ctx) {
    return Promise.reject(new Error('캔버스 컨텍스트를 생성할 수 없습니다.'));
  }

  let y = 0;
  for (const template of placedTemplates) {
    const stage = getStageRef(template.id);
    const blockHeight = getBlockHeight(template, templateHeights);
    if (stage) {
      const blockCanvas = stage.toCanvas({ pixelRatio });
      ctx.drawImage(blockCanvas, 0, y * pixelRatio);
    }
    y += blockHeight;
  }

  return new Promise((resolve, reject) => {
    outputCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('이미지 생성에 실패했습니다.'));
    }, 'image/png');
  });
};
