import { Options } from 'audiomotion-analyzer'

export interface IAnalyzerOptions extends Options {
  audioCtx?: AudioContext
  connectSpeakers?: boolean
  fsElement?: HTMLElement
  source?: HTMLMediaElement | AudioNode
}
