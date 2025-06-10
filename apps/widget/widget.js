"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let projectId = null;
let selectedType = null;
window.addEventListener('message', (event) => {
    const { data } = event;
    if ((data === null || data === void 0 ? void 0 : data.type) === 'tellthedev:init' && (data === null || data === void 0 ? void 0 : data.projectId)) {
        projectId = data.projectId;
        console.log('[TellTheDev] Widget initialized with project ID:', projectId);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    console.log('[TellTheDev] Widget DOM loaded');
    const form = document.querySelector('form');
    if (!form)
        return;
    setupTypeSelector();
    setupFormSubmit(form);
});
function setupTypeSelector() {
    const typeButtons = document.querySelectorAll('[data-type]');
    typeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-type');
            if (value === 'bug' || value === 'feature' || value === 'general') {
                selectedType = value;
                typeButtons.forEach((b) => {
                    b.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-600');
                });
                btn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-600');
            }
        });
    });
}
function setupFormSubmit(form) {
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        // if (!projectId) {
        //     alert('Widget is not initialized. No project ID.');
        //     return;
        // }
        yield handleFormSubmission(projectId);
    }));
}
const handleFormSubmission = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('[TellTheDev] Submitting feedback for project:', projectId);
    console.log('Selected type:', selectedType);
    const messageEl = document.querySelector('textarea');
    const imageEl = document.querySelector('input[type="file"]');
    const messageErrorEl = document.getElementById('message-error');
    const imageErrorEl = document.getElementById('image-error');
    const typeErrorEl = document.getElementById('type-error');
    const message = messageEl === null || messageEl === void 0 ? void 0 : messageEl.value.trim();
    const image = (_b = (_a = imageEl.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    // Clear all errors first
    if (messageErrorEl)
        messageErrorEl.textContent = '';
    if (imageErrorEl)
        imageErrorEl.textContent = '';
    if (typeErrorEl)
        typeErrorEl.textContent = '';
    let hasError = false;
    if (!message) {
        if (messageErrorEl)
            messageErrorEl.textContent = 'Please enter a message';
        hasError = true;
    }
    if (!image) {
        if (imageErrorEl)
            imageErrorEl.textContent = 'Please select an image';
        hasError = true;
    }
    if (!selectedType) {
        if (typeErrorEl)
            typeErrorEl.textContent = 'Please select a feedback type';
        hasError = true;
    }
    if (hasError) {
        console.warn('[TellTheDev] Form submission blocked due to validation errors.');
        return;
    }
    const compressedImage = yield imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
    });
    console.log(compressedImage);
});
