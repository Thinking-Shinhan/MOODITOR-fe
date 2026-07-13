'use client';

import { Image1_1Template } from '@/components/features/detail/templates/Image1_1Template';
import { Image1_2Template } from '@/components/features/detail/templates/Image1_2Template';
import { Image2_1Template } from '@/components/features/detail/templates/Image2_1Template';
import { Image2_2Template } from '@/components/features/detail/templates/Image2_2Template';
import { Image3_1Template } from '@/components/features/detail/templates/Image3_1Template';
import { Image3_2Template } from '@/components/features/detail/templates/Image3_2Template';
import { Image4_1Template } from '@/components/features/detail/templates/Image4_1Template';
import { Image4_2Template } from '@/components/features/detail/templates/Image4_2Template';
import { Text1Template } from '@/components/features/detail/templates/Text1Template';
import { Text2Template } from '@/components/features/detail/templates/Text2Template';
import { Text3Template } from '@/components/features/detail/templates/Text3Template';
import { Text4Template } from '@/components/features/detail/templates/Text4Template';
import { Text5Template } from '@/components/features/detail/templates/Text5Template';
import { MaterialTemplate } from '@/components/features/detail/templates/MaterialTemplate';
import { SizeTipTemplate } from '@/components/features/detail/templates/SizeTipTemplate';
import { SizeInfoTemplate } from '@/components/features/detail/templates/SizeInfoTemplate';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateGroupProps {
  templateId: string;
  type: DetailTemplateType;
}

export const DetailTemplateGroup = ({
  templateId,
  type,
}: DetailTemplateGroupProps) => {
  switch (type) {
    case 'IMAGE_1_1':
      return <Image1_1Template templateId={templateId} />;
    case 'IMAGE_1_2':
      return <Image1_2Template templateId={templateId} />;
    case 'IMAGE_2_1':
      return <Image2_1Template templateId={templateId} />;
    case 'IMAGE_2_2':
      return <Image2_2Template templateId={templateId} />;
    case 'IMAGE_3_1':
      return <Image3_1Template templateId={templateId} />;
    case 'IMAGE_3_2':
      return <Image3_2Template templateId={templateId} />;
    case 'IMAGE_4_1':
      return <Image4_1Template templateId={templateId} />;
    case 'IMAGE_4_2':
      return <Image4_2Template templateId={templateId} />;
    case 'TEXT_1':
      return <Text1Template templateId={templateId} />;
    case 'TEXT_2':
      return <Text2Template templateId={templateId} />;
    case 'TEXT_3':
      return <Text3Template templateId={templateId} />;
    case 'TEXT_4':
      return <Text4Template templateId={templateId} />;
    case 'TEXT_5':
      return <Text5Template templateId={templateId} />;
    case 'MATERIAL':
      return <MaterialTemplate templateId={templateId} />;
    case 'SIZE_TIP':
      return <SizeTipTemplate templateId={templateId} />;
    case 'SIZE_INFO':
      return <SizeInfoTemplate templateId={templateId} />;
    default:
      return null;
  }
};
