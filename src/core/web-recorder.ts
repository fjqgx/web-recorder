
import { MimeType, MixRecorderEvent, RecordOptions } from "../interface/index";
import { Recorder } from "./recorder";


export class WebRecorder extends Recorder {

  protected recorder?: MediaRecorder;

  protected mimeType?: MimeType;

  constructor () {
    super();
  }

  startRecord (mediaStream: MediaStream, options: RecordOptions): boolean {
    this.stopRecord();

    this.mimeType = options.mimeType;
    const chunks: Blob[] = [];
    const recorder: MediaRecorder = new MediaRecorder(mediaStream, { mimeType: this.mimeType });
    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    }
    recorder.onstop = () => {
      const fileBlob: Blob = new Blob(chunks, { type: this.mimeType });

      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onstart = null;
      }

      chunks.length = 0;
      this.emit(MixRecorderEvent.Complete, fileBlob);
    }
    recorder.start(1000);
    this.recorder = recorder;
    return true;
  }

  stopRecord (): void {
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = undefined;
    }
  }
}