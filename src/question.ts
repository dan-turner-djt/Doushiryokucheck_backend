import { VerbInfo } from "jv-conjugator";
import { getAnswers } from "./answers";
import { QuestionAnswer, QuestionInfo, VerbFormsInfo } from "./defs";
import { dbConnection } from "..";
import { RowDataPacket } from "mysql2";

export async function getQuestionInfo(verbsInfo: number[], formsInfo: VerbFormsInfo, levelsInfo: number[]): Promise<QuestionInfo> {
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

  const verbInfo: VerbInfo = await getVerbFromDB(verbsInfo, levelsInfo);

  let answers: QuestionAnswer[]; 
  
  try {
    answers = getAnswers(verbInfo, formInfo);
  } catch (e) {
    throw new Error("Get answer failed with: " + (e as Error).message);
  }

  const info: QuestionInfo = {verbInfo: verbInfo, formInfo: formInfo, answers: answers};
  return info;
}

async function getVerbFromDB(verbsInfo: number[], levelsInfo: number[]): Promise<VerbInfo> {
  const levels: string = createNumsInString(levelsInfo);
  const verbTypes: string = createNumsInString(verbsInfo);

  let query: string = "SELECT verbType, kanji, kana FROM verbs WHERE verbLevel in " + levels + " and verbType in " + verbTypes + ";";
  const [verbs] = await (await dbConnection()).query<IVerbDBInfo[]>(query);
  const verb = verbs[Math.floor(Math.random() * verbs.length)];

  const verbInfo: VerbInfo = {
    verb: {
      kana: verb.kana,
      kanji: verb.kanji
    },
    type: (verb.verbType > 100)? 1 : verb.verbType
  };

  return verbInfo;
}

function createNumsInString(data: number[]): string {
  let result = "(";

  for (let i = 0; i < data.length; i++) {
    if (i !== 0) {
      result = result.concat(', ');
    }
    result = result.concat(data[i].toString());
  }

  result = result.concat(")");
  return result;
}

interface IVerbDBInfo extends RowDataPacket {
  verbType: number,
  kanji: string,
  kana: string
}