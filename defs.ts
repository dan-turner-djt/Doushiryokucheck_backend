export declare enum VerbType {
  Ichidan = 0,
  Godan = 1,
  Suru = 2,
  Kuru = 3,
  Aru = 4,
  Iku = 5,
  Kureru = 6,
  Tou = 7,
  Irassharu = 8,
  Ossharu = 9,
  Kudasaru = 10,
  Gozaru = 11,
  Nasaru = 12
}

export type VerbInfo = {
  verb: {
      kana?: string;
      kanji?: string;
  };
  type: VerbType;
};

export declare enum FormName {
  Stem = 0,
  Present = 1,
  Past = 2,
  Te = 3,
  Imperative = 4,
  Volitional = 5,
  BaConditional = 6,
  TaraConditional = 7,
  Naide = 8,
  Zu = 9,
  Tai = 10
}
export declare enum AuxiliaryFormName {
  Potential = 0,
  Passive = 1,
  Causative = 2,
  CausativePassive = 3,
  Tagaru = 4
}
export declare enum AdditionalFormName {
  Continuous = 0,
  TeAru = 1,
  TeOku = 2,
  TeIku = 3,
  TeKuru = 4,
  TeAgeru = 5,
  TeKureru = 6,
  TeMorau = 7,
  TeShimau = 8
}

export type FormInfo = {
  formName: FormName;
  auxFormName?: AuxiliaryFormName;
  additionalFormName?: AdditionalFormName;
  negative?: boolean;
  polite?: boolean;
  shortVer?: boolean;
};

export type FullFormInfo = {displayName: string, auxDisplayName?: string, info: FormInfo};