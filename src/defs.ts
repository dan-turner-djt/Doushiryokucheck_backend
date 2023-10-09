import { FormInfo, VerbInfo } from "jv-conjugator";

export type QuestionAnswer = {kana: string, kanji?: string};
export type QuestionInfo = {verbInfo: VerbInfo, formInfo: FormInfo, answers: QuestionAnswer[]};

export type VerbFormData = {
  stem: {
    plain: boolean
  },
  present: {
    plain: boolean, polite: boolean, negativePlain: boolean, negativePolite: boolean
  },
  past: {
    plain: boolean, polite: boolean, negativePlain: boolean, negativePolite: boolean
  },
  te: {
    plain: boolean, polite: boolean, negativePlain: boolean, negativePolite: boolean
  },
  tai: {
    plain: boolean, polite: boolean, negativePlain: boolean, negativePolite: boolean
  }
  zu: {
    plain: boolean
  },
  volitional: {
    plain: boolean, polite: boolean, negativePlain: boolean
  },
  imperative: {
    plain: boolean, polite: boolean, negativePlain: boolean
  },
  baConditional: {
    plain: boolean, polite: boolean
  },
  taraConditional: {
    plain: boolean, polite: boolean, negativePlain: boolean, negativePolite: boolean
  }
}

export type AuxFormData = {
  potential: {
    standard: boolean
  },
  passive: {
    standard: boolean
  },
  causative: {
    standard: boolean
  },
  causativePassive: {
    standard: boolean
  }
  chau: {
    standard: boolean
  }
}

export type SettingsObject = {
  testType: any
  testTypeObject: any,
	verbType: {
		vtIchidan: boolean,
		vtIrregular: boolean,
		vtBu: boolean,
		vtGu: boolean,
		vtKu: boolean,
		vtMu: boolean,
		vtNu: boolean,
		vtRu: boolean,
		vtSu: boolean,
		vtTsu: boolean,
		vtU: boolean,

	},
	verbLevel: {
		vlN5: boolean,
		vlN4: boolean,
		vlN3: boolean,
		vlN2: boolean,
		vlN1: boolean
	},
	verbForms: VerbFormData,
	auxForms: AuxFormData,
	exclusiveAux: boolean
}

export type WithPlainForms = "stem" | "present" | "past" | "te" | "tai" | "zu" | "volitional" | "imperative" | "baConditional" | "taraConditional";
export type WithPoliteForms = "present" | "past" | "te" | "tai" | "volitional" | "imperative" | "baConditional" | "taraConditional";
export type WithNegativeForms = "present" | "past" | "te" | "tai" | "volitional" | "imperative" | "taraConditional";
export type WithNegativePoliteForms = "present" | "past" | "te" | "tai" | "taraConditional";
export type FormNames = WithPlainForms | WithPoliteForms | WithNegativeForms | WithNegativePoliteForms;


export type AuxFormNames = "potential" | "passive" | "causative" | "causativePassive" | "chau";

export type VerbFormsInfo = {main: FormInfo[], extraAux: FormInfo[]};