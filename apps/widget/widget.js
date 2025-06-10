"use strict";
let projectId;
window.addEventListener('message', (event) => {
    const { data } = event;
    if ((data === null || data === void 0 ? void 0 : data.type) === "tellthedev:init" && (data === null || data === void 0 ? void 0 : data.projectId)) {
        projectId = data.projectId;
        console.log("[TellTheDev] Widget initialized with project ID:", projectId);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    console.log("[TellTheDev] Widget DOM loaded");
    const form = document.querySelector('form');
    if (!form)
        return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!projectId) {
            alert("Widget is not initialized. No project ID.");
            return;
        }
        handleFormSubmission(projectId);
    });
});
const handleFormSubmission = (projectId) => {
    console.log(projectId);
    console.log("Submit clicked. Ready to wire up");
};
