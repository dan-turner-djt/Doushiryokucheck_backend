import { VerbInfo } from "jv-conjugator";
import { getAnswers } from "./answers";
import { QuestionAnswer, QuestionInfo, VerbFormsInfo } from "./defs";

export function getQuestionInfo(verbList: VerbInfo[], formsInfo: VerbFormsInfo): QuestionInfo {
  const verbInfo: VerbInfo =  verbList[Math.floor(Math.random() * verbList.length)];
  
  let formInfo;
		if (formsInfo.extraAux.length > 0) {
			if(Math.random() > 0.5) {
				formInfo = formsInfo.extraAux[Math.floor(Math.random() * formsInfo.extraAux.length)];
			} else {
				formInfo = formsInfo.main[Math.floor(Math.random() * formsInfo.main.length)];
			}
		} else {
			formInfo = formsInfo.main[Math.floor(Math.random() * formsInfo.main.length)];
		}

  let answers: QuestionAnswer[]; 
  
  try {
    answers = getAnswers(verbInfo, formInfo);
  } catch (e) {
    throw new Error("Get answer failed with: " + (e as Error).message);
  }

  const info: QuestionInfo = {verbInfo: verbInfo, formInfo: formInfo, answers: answers};
  return info;
}