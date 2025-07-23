import { LevelsSettingsObjectData } from "./defs";

export function convertLevelsInfo(levelsInfo: LevelsSettingsObjectData): number[] {
    const levels: number[] = [];

    if (levelsInfo.vlN1) levels.push(1);
    if (levelsInfo.vlN2) levels.push(2);
    if (levelsInfo.vlN3) levels.push(3);
    if (levelsInfo.vlN4) levels.push(4);
    if (levelsInfo.vlN5) levels.push(5);

    return levels;
}