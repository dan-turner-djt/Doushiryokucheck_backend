import { AuxiliaryFormName, FormInfo, FormName, Result, VerbInfo, getVerbConjugation } from "jv-conjugator";

export function getAnswers(verbInfo: VerbInfo, formInfo: FormInfo): {kana: string, kanji?: string}[] {
	const answers: {kana: string, kanji?: string}[] = [];

  try {
    const res = getConjugation(verbInfo, formInfo);
    answers.push(res);
  } catch (e) {
    throw new Error((e as Error).message);
  }
  
	// Add the shortVer answer as well if there is one
	if(formInfo.formName === FormName.BaConditional && formInfo.polite
		|| formInfo.auxFormName === AuxiliaryFormName.Potential
		|| formInfo.auxFormName === AuxiliaryFormName.Causative
		|| formInfo.auxFormName === AuxiliaryFormName.CausativePassive) {

		const newFormInfo: FormInfo = JSON.parse(JSON.stringify(formInfo));
		newFormInfo.shortVer = true;

    try {
      const res = getConjugation(verbInfo, newFormInfo);
      answers.push(res);
    } catch (e) {
      throw new Error((e as Error).message);
    }
	}
	
	return answers;
}

function getConjugation(verbInfo: VerbInfo, formInfo: FormInfo): {kana: string, kanji?: string} {
	const res: Result | Error = getVerbConjugation(verbInfo, formInfo);
	if (res instanceof Error) throw new Error(res.message);
	if (!res.kana) throw new Error("No kana result");

	return {kana: res.kana, kanji: res.kanji};
}