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

    type Profile = {
        id: string
        onboarding_complete: boolean
        created_at: string
    }

    type UStepperRef = {
        hasNext: boolean,
        hasPrev: boolean,
        next: () => void,
        prev: () => void
    }

    type UploadedImage = {
        name: string
        type: string
        stream: () => Readable
    }

    type FeedbackEntry = import('./feedback').FeedbackEntry;
    type FeedbackReplyTemplate = import('./feedback').FeedbackReplyTemplate;
    type FeedbackTimelineEntry = import('./feedback').FeedbackTimelineEntry;

    type Project = import('./project').Project;

    type WidgetSettings = import('./widget-settings').WidgetSettings;
    type WidgetSettingsPayload = import('./widget-settings').WidgetSettingsPayload;

    type CreateProjectPayload = import('./project').CreateProjectPayload;


}