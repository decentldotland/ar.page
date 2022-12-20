import { ONBOARDING_LOCAL } from "../constants"

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