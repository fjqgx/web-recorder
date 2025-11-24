export const enum MimeType {
  Audio_WebM = 'audio/webm',
  Video_WebM = 'video/webm',
  Video_MP4 = 'video/mp4',
}

export interface RecordOptions {
  mimeType: MimeType;
}


/**
 * 前端录制工具
 */
export declare class MixRecorder {

  support (type: MimeType): boolean;

  startRecord (mediaStream: MediaStream, options: RecordOptions): void;

  stopRecord (): void;

  on (event: 'complete', listener: (blob: Blob) => void): void;
}