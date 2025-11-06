

export interface RecordOptions {
  mimeType: string;
}

export const enum MixRecorderEvent {
  Complete = 'complete',
}

/**
 * 前端录制工具
 */
export declare class MixRecorder {

  startRecord (mediaStream: MediaStream, options: RecordOptions): void;

  stopRecord (): void;

  on (event: MixRecorderEvent.Complete, listener: (blob: Blob) => void): void;
}