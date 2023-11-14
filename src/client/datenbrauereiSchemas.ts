/**
 * Generated by @openapi-codegen
 *
 * @version 1.0.0
 */
export type AbfrageErgebnis = {
  abfrageId?: string;
  /**
   * @format date-time
   */
  timestamp?: string;
  merkmalErgebnisse?: MerkmalErgebnis[];
};

export type MerkmalErgebnis = {
  merkmalCode?: string;
  regionalGliederung?: string;
  normierterWert?: number;
  absoluterWert?: number;
};

export type Error = {
  code?: string;
  message?: string;
};

export type Abfrage = {
  uuid?: string;
  regionalerUmfang?: string;
  dimensionen?: AbfrageDimension[];
};

export type AbfrageDimension = {
  merkmalName?: string;
  gewichtung?: "NULL" | "EINS" | "ZWEI" | "DREI";
};

export type AboSetup = {
  aboStammdaten?: AboStammdaten;
};

export type AboStammdaten = {
  uuid?: string;
  email?: string;
  name?: string;
  abfragen?: Abfrage[];
};
