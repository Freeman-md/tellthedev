/// <reference types="nuxt" />

export { }

declare global {

    type RegisterInfo = {
        email: string,
        firstName: string,
        lastName: string,
        password: string,
    }

    type RegisterFormData = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    type FeedbackEntry = import('./feedback').FeedbackEntry;

    type Project = import('./project').Project;

    type WidgetSettings = import('./widget-settings').WidgetSettings;
    type WidgetSettingsPayload = import('./widget-settings').WidgetSettingsPayload;

    type CreateProjectPayload = import('./project').CreateProjectPayload;

    type UStepperRef = {
        hasNext: boolean,
        hasPrev: boolean,
        next: () => void,
        prev: () => void
    }

}