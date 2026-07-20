'use client';

import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-konva';
import type Konva from 'konva';
import { useDetailCanvasZoomStore } from '@/stores/detailCanvasZoomStore';

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
  const zoom = useDetailCanvasZoomStore((state) => state.zoom);

  useEffect(() => {
    const textNode = textRef.current;
    if (!isEditing || !textNode) return;

    const stage = textNode.getStage();
    if (!stage) return;

    const zoomScale = zoom / 100;
    const stageBox = stage.container().getBoundingClientRect();
    const absolutePosition = textNode.absolutePosition();
    const scaledFontSize = fontSize * zoomScale;

    const textarea = document.createElement('textarea');
    textarea.rows = 1;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.style.position = 'absolute';
    textarea.style.top = `${stageBox.top + window.scrollY + absolutePosition.y * zoomScale}px`;
    textarea.style.left = `${stageBox.left + window.scrollX + absolutePosition.x * zoomScale}px`;
    textarea.style.width = `${width * zoomScale}px`;
    textarea.style.fontSize = `${scaledFontSize}px`;
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
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
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
  }, [
    isEditing,
    text,
    width,
    fontSize,
    lineHeight,
    fill,
    fontStyle,
    onChange,
    zoom,
  ]);

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
