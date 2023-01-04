import { ONBOARDING_LOCAL, DECENT_LORE_NAMES } from "../constants"

/**
 * Sets onboarding step in localstorage key 'onboarding
 * @returns saves to localstorage key 'onboarding'
 */
export const getOnboardingStep = () => {
    return localStorage.getItem(ONBOARDING_LOCAL);
}

/**
 * Gets onboarding step in localstorage key 'onboarding
 * @returns {Number} - localstorage step in onboarding
 */
export const getOnboardingStepNumeric = () => {
    return Number(localStorage.getItem(ONBOARDING_LOCAL));
}

/**
 * Gets onboarding step in localstorage key 'onboarding
 * @returns {String} - localstorage step in onboarding
 */
export const setOnboardingStep = (step: string) => {
    localStorage.setItem(ONBOARDING_LOCAL, step);
}

/**
 * Create a Random Label Handle
 * @param {string} did - arweave address
 * @returns {String} - Handle with DL Lore name + arweave last 4
 */
export const createLabelHandle = (did: string) => {
    const loreName = DECENT_LORE_NAMES[getRandomNumber(DECENT_LORE_NAMES)];
    const lastFour = did.substring(did.length - 4);
    return loreName+"#"+lastFour;
}

/**
 * Returns a random number
 * @param {String[]} - array of names
 * @returns {number} - Random number from 0 to array length
 */
export const getRandomNumber = (array: String[]) => {
    return Math.floor(Math.random() * array.length);
}