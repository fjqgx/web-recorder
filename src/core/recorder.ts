import { RecordOptions } from "../interface/index";
import { EventEmitter } from "../utils/event-emitter";


export abstract class Recorder extends EventEmitter {

  constructor () {
    super();
  }
 
  abstract startRecord (mediaStream: MediaStream, options: RecordOptions): boolean;

  abstract stopRecord(): void;
}