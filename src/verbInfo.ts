import { VerbInfo } from "jv-conjugator";
import { SettingsObject, VerbTypeSettingsObjectData } from "./defs";
import path from 'path';
import fs from 'fs/promises';

export function convertVerbTypesInfo(settingsData: VerbTypeSettingsObjectData): number[] {
	const verbTypes: number[] = [];

	if (settingsData.vtIchidan) verbTypes.push(0);
	if (settingsData.vtU) verbTypes.push(101);
	if (settingsData.vtKu) verbTypes.push(102);
	if (settingsData.vtGu) verbTypes.push(103);
	if (settingsData.vtSu) verbTypes.push(104);
	if (settingsData.vtTsu) verbTypes.push(105);
	if (settingsData.vtNu) verbTypes.push(106);
	if (settingsData.vtBu) verbTypes.push(107);
	if (settingsData.vtMu) verbTypes.push(108);
	if (settingsData.vtRu) verbTypes.push(109);

	if (settingsData.vtIrregular) {
		for (let i = 2; i < 13; i++) {
			verbTypes.push(i);
		}
	}

	return verbTypes;
}

export function getVerbLevelsArray(settingsObj: SettingsObject): string[] {
	const verbLevels: string[] = [];
	const verbLevelsObj = settingsObj.verbLevel;

	if (verbLevelsObj.vlN5) {
		verbLevels.push("N5");
	}
	if (verbLevelsObj.vlN4) {
		verbLevels.push("N4");
	}
	if (verbLevelsObj.vlN3) {
		verbLevels.push("N3");
	}
	if (verbLevelsObj.vlN2) {
		verbLevels.push("N2");
	}
	if (verbLevelsObj.vlN1) {
		verbLevels.push("N1");
	}

	return verbLevels;
}

export async function getFullVerbList(settings: SettingsObject): Promise<VerbInfo[]> {

	const settingsList: {level: number, type: string}[] = convertSettingsIntoList(settings);

	try {
		let fullList: VerbInfo[] = [];
		for (const setting of settingsList) {
			if (setting.type === "godan") {
				const godanTypes: string[] = [];
				if (settings.verbType.vtBu) {
					godanTypes.push("bu");
				}
				if (settings.verbType.vtGu) {
					godanTypes.push("gu");
				}
				if (settings.verbType.vtKu) {
					godanTypes.push("ku");
				}
				if (settings.verbType.vtMu) {
					godanTypes.push("mu");
				}
				if (settings.verbType.vtNu) {
					godanTypes.push("nu");
				}
				if (settings.verbType.vtRu) {
					godanTypes.push("ru");
				}
				if (settings.verbType.vtSu) {
					godanTypes.push("su");
				}
				if (settings.verbType.vtTsu) {
					godanTypes.push("tsu");
				}
				if (settings.verbType.vtU) {
					godanTypes.push("u");
				}

				const res = await fetchFromFile(setting.level, setting.type, godanTypes);
				fullList = fullList.concat(res);
			} else {
				const res = await fetchFromFile(setting.level, setting.type);
				fullList = fullList.concat(res);
			}
		}
		
		return fullList;
	} 
	catch (e) {
		throw new Error("Fetch verb list failed with: " + (e as Error).message);
	}
}

export async function fetchFromFile(level: number, type: string, godanTypes: string[] = []): Promise<VerbInfo[]> {
	try {
    return fs.readFile(path.join(__dirname, '..', '..', "verbData", "n" + level, "n" + level + "_"  + type + ".json"), "utf-8")
      .then(res => {
        return JSON.parse(res);
      })
      .then(res => {
        if (type === "godan") {
					if (godanTypes.length === 0) {
						throw new Error;
					}

					let toReturn: VerbInfo[] = [];
					Object.keys(res.data).forEach(type => {
						if (godanTypes.includes(type)) {
							toReturn = toReturn.concat(res.data[type]);
						}
					});

					return toReturn;
				}

				return res.data;
      })
      .catch(err => {
        console.log(err);
				throw new Error((err as Error).message);
			});
	}
	catch (e) {
		throw new Error;
	}
}

function convertSettingsIntoList(settings: SettingsObject): {level: number, type: string}[] {
	type levelType = "vlN5" | "vlN4" | "vlN3" | "vlN2" | "vlN1";

	const levelsList: number[] = [];
	Object.keys(settings.verbLevel).forEach((l) => {
		if(settings.verbLevel[l as levelType] === true) {
			levelsList.push(Number(l.substring(l.length - 1)));
		}
	});
	
	const settingsList: {level: number, type: string}[] = [];
	levelsList.forEach(l => {
		if (settings.verbType.vtIchidan) {
			settingsList.push({level: l, type: "ichidan"});
		}
		if (settings.verbType.vtIrregular) {
			settingsList.push({level: l, type: "irregular"});
		}
		
		if (settings.verbType.vtBu || settings.verbType.vtGu || settings.verbType.vtKu || settings.verbType.vtMu || settings.verbType.vtNu 
			|| settings.verbType.vtRu || settings.verbType.vtSu || settings.verbType.vtTsu || settings.verbType.vtU) {
			settingsList.push({level: l, type: "godan"});
		}
	});

	return settingsList;
}