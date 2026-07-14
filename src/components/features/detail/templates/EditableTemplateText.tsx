'use client';

import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-konva';
import type Konva from 'konva';

interface EditableTemplateTextProps {
  x?: number;
  y?: number;
  width: number;
  text: string;
  onChange: (value: string) => void;
  fontSize: number;
  lineHeight: number;
  fill: string;
  fontStyle?: string;
}

// 더블클릭하면 Konva Text 자리에 정확히 겹치는 textarea를 띄워 값을 편집하고,
// 포커스가 빠지면 편집을 마치고 Konva Text로 되돌린다.
// textarea 위치는 캔버스가 화면에 그려진 실제 픽셀 좌표를 런타임에 계산해야 해서
// Tailwind 클래스로 표현할 수 없어 인라인 스타일이 불가피하다.
export const EditableTemplateText = ({
  x = 0,
  y = 0,
  width,
  text,
  onChange,
  fontSize,
  lineHeight,
  fill,
  fontStyle,
}: EditableTemplateTextProps) => {
  const textRef = useRef<Konva.Text>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const textNode = textRef.current;
    if (!isEditing || !textNode) return;

    const stage = textNode.getStage();
    if (!stage) return;

    const stageBox = stage.container().getBoundingClientRect();
    const absolutePosition = textNode.absolutePosition();

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.style.position = 'absolute';
    textarea.style.top = `${stageBox.top + window.scrollY + absolutePosition.y}px`;
    textarea.style.left = `${stageBox.left + window.scrollX + absolutePosition.x}px`;
    textarea.style.width = `${width}px`;
    textarea.style.minHeight = `${fontSize * lineHeight}px`;
    textarea.style.fontSize = `${fontSize}px`;
    textarea.style.lineHeight = String(lineHeight);
    textarea.style.fontFamily = 'inherit';
    textarea.style.fontWeight = fontStyle === 'bold' ? 'bold' : 'normal';
    textarea.style.color = fill;
    textarea.style.border = 'none';
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = '2px solid #ff5e00';
    textarea.style.resize = 'none';
    textarea.style.wordBreak = 'break-all';
    textarea.style.zIndex = '1000';
    textarea.focus();
    textarea.select();

    const commitAndClose = () => {
      onChange(textarea.value);
      setIsEditing(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    textarea.addEventListener('blur', commitAndClose);
    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      textarea.removeEventListener('blur', commitAndClose);
      textarea.removeEventListener('keydown', handleKeyDown);
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
    };
  }, [isEditing, text, width, fontSize, lineHeight, fill, fontStyle, onChange]);

  return (
    <Text
      ref={textRef}
      x={x}
      y={y}
      width={width}
      text={text}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontStyle={fontStyle}
      fill={fill}
      wrap="char"
      visible={!isEditing}
      onDblClick={() => setIsEditing(true)}
      onDblTap={() => setIsEditing(true)}
    />
  );
};
