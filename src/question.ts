import { getAnswers } from "./answers";
import { QuestionAnswer, QuestionInfo } from "./defs";

export function getQuestionInfo(): QuestionInfo {
  const verbInfo = {verb: {kana: "たべる", kanji: "食べる"}, type: 0};
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