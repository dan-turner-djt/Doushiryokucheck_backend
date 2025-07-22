import { VerbInfo } from "jv-conjugator";
import { fetchFromFile } from "./verbInfo";
import { dbConnection } from "..";

export async function convertVerbs() {
    const level: number = 1;

    const godanTypes: string[] = [];
    godanTypes.push("u");
    godanTypes.push("ku");
    godanTypes.push("gu");
    godanTypes.push("su");
    godanTypes.push("tsu");
    godanTypes.push("nu");
    godanTypes.push("bu");
    godanTypes.push("mu");
    godanTypes.push("ru");

    const info = await fetchFromFile(level, "godan", godanTypes);
    await insertIntoDB(info, level);
}

async function insertIntoDB(info: VerbInfo[], level: number) {
    info.forEach(async verb => {
        let verbType = verb.type;
        if (verbType === 1 && verb.verb.kana) {
            verbType = convertGodanToTypeNumber(verb.verb.kana);
        }
        const query: string = "INSERT INTO verbs (verbType, verbLevel, kanji, kana) VALUES (" + verbType + ", " + level + ", '" + verb.verb.kanji + "', '" + verb.verb.kana + "');";
        await (await dbConnection()).query(query);
    });
}

function convertGodanToTypeNumber(kana: string): number {
    const ending = kana.slice(-1);

    switch (ending) {
        case 'う':
            return 101;
        case 'く':
            return 102;
        case 'ぐ':
            return 103;
        case 'す':
            return 104;
        case 'つ':
            return 105;
        case 'ぬ':
            return 106;
        case 'ぶ':
            return 107;
        case 'む':
            return 108;
        case 'る':
            return 109;
        default:
            return 100;
    }
}