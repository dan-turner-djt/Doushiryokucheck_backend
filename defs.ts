import { FormInfo, VerbInfo } from "jv-conjugator";

export type FullFormInfo = {displayName: string, auxDisplayName?: string, info: FormInfo};
export type QuestionInfo = {verbInfo: VerbInfo, formInfo: FullFormInfo};