import { enUS, hiIN, frFR, jaJP, viVN, hyAM, arSD } from "@mui/material/locale";
import { PATH_DASHBOARD } from "./routes/paths";

export const defaultSettings = {
  themeMode: "dark",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

// navbar

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "/assets/icons/flags/flag_en.svg",
  },
  {
    label: "Hindi",
    value: "hi",
    systemValue: hiIN,
    icon: "/assets/icons/flags/flag_hi.svg",
  },
  {
    label: "French",
    value: "fr",
    systemValue: frFR,
    icon: "/assets/icons/flags/flag_fr.svg",
  },
  {
    label: "Japanese",
    value: "ja",
    systemValue: jaJP,
    icon: "/assets/icons/flags/flag_ja.svg",
  },
  {
    label: "Vietnamese",
    value: "vn",
    systemValue: viVN,
    icon: "/assets/icons/flags/flag_vn.svg",
  },
  {
    label: "Armenian",
    value: "am",
    systemValue: hyAM,
    icon: "/assets/icons/flags/flag_am.svg",
  },
  {
    label: "Arabic (Sudan)",
    value: "ar",
    systemValue: arSD,
    icon: "/assets/icons/flags/flag_am.svg",
  },
];

export const defaultLang = allLangs[0]; // Default Language => English

export const DEFAULT_PATH = PATH_DASHBOARD.general.app;
