import { Recorder } from "./core/recorder";
import { MixRecorderEvent, RecordOptions } from "./interface/index";
import { EventEmitter } from "./utils/event-emitter";


/**
 * 前端录制工具
 */
export class MixRecorder extends EventEmitter {

  protected recorder = new Recorder();

  constructor () {
    super();
    this.recorder.on(MixRecorderEvent.Complete, (blob: Blob) => {
      this.emit(MixRecorderEvent.Complete, blob);
    })
  }

  startRecord (mediaStream: MediaStream, options: RecordOptions): void {
    this.recorder.startRecord(mediaStream, options);
  }

  stopRecord (): void {
    this.recorder.stopRecord();
  }
}

// @ts-ignore
window.MixRecorder = MixRecorder;