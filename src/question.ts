import { VerbInfo } from "jv-conjugator";
import { getAnswers } from "./answers";
import { QuestionAnswer, QuestionInfo } from "./defs";

export function getQuestionInfo(verbList: VerbInfo[]): QuestionInfo {
  const verbInfo: VerbInfo =  verbList[Math.floor(Math.random() * verbList.length)];
  const formInfo = {formName: 1};

  let answers: QuestionAnswer[]; 
  
  try {
    answers = getAnswers(verbInfo, formInfo);
  } catch (e) {
    throw new Error("Get answer failed with: " + (e as Error).message);
  }

  const info: QuestionInfo = {verbInfo: verbInfo, formInfo: formInfo, answers: answers};
  return info;
}