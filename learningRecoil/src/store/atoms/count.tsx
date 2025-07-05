import { atom } from "recoil";


// Problem: Recoil 0.7.7 is NOT compatible with React 19

// React 19 (you have 19.1.0) introduced breaking changes in React internals.

// Recoil 0.7.7 still relies on private internals like
// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
// which React 19 removed or changed.

// That’s why you're seeing the error:

// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED is undefined

export const countAtom = atom({
    key: "countAtom",
    default: 0
})

