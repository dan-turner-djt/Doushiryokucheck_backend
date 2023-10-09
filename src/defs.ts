import { FormInfo, VerbInfo } from "jv-conjugator";

export type QuestionAnswer = {kana: string, kanji?: string};
export type QuestionInfo = {verbInfo: VerbInfo, formInfo: FormInfo, answers: QuestionAnswer[]};