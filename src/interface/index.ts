export const enum MimeType {
  Audio_WebM = 'audio/webm',
  Pcm = 'pcm',
  Video_WebM = 'video/webm',
  Video_MP4 = 'video/mp4',
  Wav = 'wav',
  
}

export interface RecordOptions {
  mimeType: MimeType;
}

export const enum MixRecorderEvent {
  Complete = 'complete',
}