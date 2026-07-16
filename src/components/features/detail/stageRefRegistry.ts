import type Konva from 'konva';

const stageRefs = new Map<string, Konva.Stage>();

export const registerStageRef = (templateId: string, stage: Konva.Stage) => {
  stageRefs.set(templateId, stage);
};

export const unregisterStageRef = (templateId: string, stage: Konva.Stage) => {
  if (stageRefs.get(templateId) === stage) {
    stageRefs.delete(templateId);
  }
};

export const getStageRef = (templateId: string) => stageRefs.get(templateId);
