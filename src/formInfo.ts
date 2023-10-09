import { AdditionalFormName, AuxiliaryFormName, FormInfo, FormName } from "jv-conjugator";
import { AuxFormData, AuxFormNames, VerbFormData, VerbFormsInfo, WithNegativeForms, WithNegativePoliteForms, WithPlainForms, WithPoliteForms } from "./defs";

export function convertVerbFormsInfo(verbForms: VerbFormData, auxForms: AuxFormData, exclusiveAux: boolean): VerbFormsInfo {
	const mainInfo: FormInfo[] = [];
	const extraAuxInfo: FormInfo[] = [];

	const auxFormsList: string[] = [];
	Object.keys(auxForms).forEach(auxKey => {
		if(auxForms[auxKey as AuxFormNames].standard === true) {
			auxFormsList.push(auxKey);
		}
	});

	Object.keys(verbForms).forEach(key => {
		if (Object.keys(verbForms[key as keyof VerbFormData]).includes("plain")) {
			if ((verbForms[key as WithPlainForms]).plain === true) {
				if (auxFormsList.length > 0) {
					auxFormsList.forEach(auxForm => {
						return extraAuxInfo.push((auxForm === "chau")? {formName: getJvConjFormName(key), additionalFormName: getJvConjAdditionalFormName(auxForm), shortVer: true} : {formName: getJvConjFormName(key), auxFormName: getJvConjAuxFormName(auxForm)});
					});

					if (exclusiveAux) {
						return;
					}
				}

				mainInfo.push({formName: getJvConjFormName(key)});
			}
		}
		if (Object.keys(verbForms[key as keyof VerbFormData]).includes("polite")) {
			if ((verbForms[key as WithPoliteForms]).polite === true) {
				if (auxFormsList.length > 0) {
					auxFormsList.forEach(auxForm => {
						extraAuxInfo.push(
							(auxForm === "chau")? {formName: getJvConjFormName(key), additionalFormName: getJvConjAdditionalFormName(auxForm), shortVer: true, polite: true} : {formName: getJvConjFormName(key), auxFormName: getJvConjAuxFormName(auxForm), polite: true});
					});

					if (exclusiveAux) {
						return;
					}
				}

				mainInfo.push({formName: getJvConjFormName(key), polite: true});
			}
		}
		if (Object.keys(verbForms[key as keyof VerbFormData]).includes("negativePlain")) {
			if ((verbForms[key as WithNegativeForms]).negativePlain === true) {
				if (auxFormsList.length > 0) {
					auxFormsList.forEach(auxForm => {
						extraAuxInfo.push(
							(auxForm === "chau")? {formName: getJvConjFormName(key), additionalFormName: getJvConjAdditionalFormName(auxForm), shortVer: true, negative: true} : {formName: getJvConjFormName(key), auxFormName: getJvConjAuxFormName(auxForm), negative: true});
					});

					if (exclusiveAux) {
						return;
					}
				}

				mainInfo.push({formName: getJvConjFormName(key), negative: true});
			}
		}
		if (Object.keys(verbForms[key as keyof VerbFormData]).includes("negativePolite")) {
			if ((verbForms[key as WithNegativePoliteForms]).negativePolite === true) {
				if (auxFormsList.length > 0) {
					auxFormsList.forEach(auxForm => {
						extraAuxInfo.push(
							(auxForm === "chau")? {formName: getJvConjFormName(key), additionalFormName: getJvConjAdditionalFormName(auxForm), shortVer: true, polite: true, negative: true} : {formName: getJvConjFormName(key), auxFormName: getJvConjAuxFormName(auxForm), polite: true, negative: true});
					});

					if (exclusiveAux) {
						return;
					}
				}
				
				mainInfo.push({formName: getJvConjFormName(key), polite: true, negative: true});
			}
		}
	});

	if(extraAuxInfo.length > 0 && !exclusiveAux) {
		return {main: mainInfo, extraAux: extraAuxInfo};
	}

	return {main: mainInfo.concat(extraAuxInfo), extraAux: []};
}

function getJvConjFormName(name: string): FormName {
	switch(name) {
	case "stem":
		return FormName.Stem;
	case "present":
		return FormName.Present;
	case "past":
		return FormName.Past;
	case "te":
		return FormName.Te;
	case "naide":
		return FormName.Naide;
	case "tai":
		return FormName.Tai;
	case "zu":
		return FormName.Zu;
	case "volitional":
		return FormName.Volitional;
	case "imperative":
		return FormName.Imperative;
	case "baConditional":
		return FormName.BaConditional;
	case "taraConditional":
		return FormName.TaraConditional;
	default:
		return FormName.Present;
	}
}

function getJvConjAuxFormName(name: string): AuxiliaryFormName {
	switch(name) {
	case "potential":
		return AuxiliaryFormName.Potential;
	case "passive":
		return AuxiliaryFormName.Passive;
	case "causative":
		return AuxiliaryFormName.Causative;
	case "causativePassive":
		return AuxiliaryFormName.CausativePassive;
	default:
		return AuxiliaryFormName.Potential;
	}
}

function getJvConjAdditionalFormName(name: string): AdditionalFormName {
	switch(name) {
	default:
		return AdditionalFormName.TeShimau;
	}
}