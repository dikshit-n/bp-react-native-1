// Type defined useNavigation hook

import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { NAVIGATION } from "src/types";

export const useNavigation = useReactNavigation<NAVIGATION>;
