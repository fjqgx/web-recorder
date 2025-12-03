import { Recorder } from "./core/recorder";
import { WebRecorder } from "./core/web-recorder";
import { MimeType, MixRecorderEvent, RecordOptions } from "./interface/index";
import { EventEmitter } from "./utils/event-emitter";


/**
 * 前端录制工具
 */
class MixRecorder extends EventEmitter {

  protected recorder?: Recorder;

  constructor () {
    super();
  }

  support (type: MimeType): boolean {
    switch (type) {
      case MimeType.Audio_WebM:
      case MimeType.Video_WebM:
      case MimeType.Video_MP4:
        return MediaRecorder.isTypeSupported(type);

      // case MimeType.Wav:
      // case MimeType.Pcm:
      //   return !!MediaStreamTrackProcessor;


      default:
        break;
    }
    return false;
  }

  startRecord (mediaStream: MediaStream, options: RecordOptions): boolean {
    this.stopRecord();


    if (!this.support(options.mimeType)) {
      return false; 
    }

    this.recorder = this.createRecorder(options);
    if (!this.recorder) {
      return false;
    }

    this.recorder.on(MixRecorderEvent.Complete, (blob: Blob) => {
      this.emit(MixRecorderEvent.Complete, blob);
    })
    return this.recorder.startRecord(mediaStream, options);
  }

  stopRecord (): void {
    if (this.recorder) {
      this.recorder.stopRecord();
    }
  }

  protected createRecorder (options: RecordOptions): Recorder | undefined {

    switch (options.mimeType) {
      case MimeType.Audio_WebM:
      case MimeType.Video_WebM:
      case MimeType.Video_MP4:
        return new WebRecorder();

      default:
        break;
    }
    return undefined;
  }
}

export { MixRecorder, MimeType };

// @ts-ignore
window.MixRecorder = MixRecorder;