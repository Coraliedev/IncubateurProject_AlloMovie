import { atom } from "jotai";

const isConnectedAtom = atom(false);
const authVisibilityAtom = atom("hidden");
const searchkeyAtom = atom("");
const pageAtom = atom(1);

export { isConnectedAtom, authVisibilityAtom, searchkeyAtom, pageAtom };
