import { isSupportedCountry } from "react-phone-number-input"

export const PHONE_COUNTRIES = [
  // Afrique du Nord
  "DZ",
  "EG",
  "LY",
  "MA",
  "SD",
  "TN",
  // Afrique de l'Ouest
  "BJ",
  "BF",
  "CV",
  "CI",
  "GM",
  "GH",
  "GN",
  "GW",
  "LR",
  "ML",
  "MR",
  "NE",
  "NG",
  "SN",
  "SL",
  "TG",
  // Afrique centrale
  "CM",
  "CF",
  "TD",
  "CG",
  "CD",
  "GQ",
  "GA",
  "ST",
  "AO",
  // Afrique de l'Est
  "BI",
  "KM",
  "DJ",
  "ER",
  "ET",
  "KE",
  "MG",
  "MW",
  "MU",
  "MZ",
  "RW",
  "SC",
  "SO",
  "SS",
  "TZ",
  "UG",
  "ZM",
  "ZW",
  // Afrique australe
  "BW",
  "LS",
  "NA",
  "ZA",
  "SZ",
  // Territoires francophones d'outre-mer
  "RE",
  "YT",
  // France
  "FR",
] as const

export const PHONE_COUNTRY_SET = new Set<string>(PHONE_COUNTRIES)

export function getDefaultCountry(): string {
  if (typeof navigator === "undefined") {
    return "MA"
  }

  const language = navigator.language || "fr-FR"
  const [lang, region] = language.split("-")

  if (region && isSupportedCountry(region) && PHONE_COUNTRY_SET.has(region.toUpperCase())) {
    return region.toUpperCase()
  }

  if (lang && lang.toLowerCase().startsWith("fr")) {
    return "FR"
  }

  return "MA"
}
