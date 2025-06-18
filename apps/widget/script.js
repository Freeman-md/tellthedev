const currentScript = document.currentScript
const projectId = currentScript?.getAttribute('data-project-id')

if (!projectId) {
    console.warn('[TellTheDev] No project ID provided')
}

// Validate project before creating widget
const validateProject = async (projectId) => {
    try {
        const response = await fetch('http://127.0.0.1:54321/functions/v1/validate-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectId })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        return result.valid === true
    } catch (error) {
        console.error('[TellTheDev] Project validation failed:', error)
        return false
    }
}

// Initialize widget only if project is valid
const initializeWidget = async () => {
    if (!projectId) {
        console.warn('[TellTheDev] No project ID provided')
        return
    }

    const isValid = await validateProject(projectId)
    
    if (!isValid) {
        console.warn('[TellTheDev] Invalid project ID or project validation failed')
        return
    }

    const host = document.createElement('div')
    host.id = 'tellthedev-shadow-root'
    document.body.appendChild(host)

    const shadowRoot = host.attachShadow({ mode: 'open' })

    const styleTag = document.createElement('style')
    styleTag.innerHTML = `
        .tellthedev-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: auto;
            z-index: 9999;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            background: transparent;
            display: none;
        }

      .tellthedev-widget-container.show {
        display: block;
      }

      .tellthedev-widget-container iframe {
        width: 100%;
        height: 400px;
        border: none;
      }

      .tellthedev-feedback-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        transition: all 0.2s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .tellthedev-feedback-button:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      }

      .tellthedev-feedback-button:active {
        transform: translateY(0);
      }
    `

    // Create floating feedback button
    const feedbackButton = document.createElement('button')
    feedbackButton.className = 'tellthedev-feedback-button'
    feedbackButton.textContent = 'Feedback'

    const container = document.createElement('div')
    container.className = 'tellthedev-widget-container';

    const iframe = document.createElement('iframe')
    iframe.src = `http://127.0.0.1:5500/apps/widget/iframe.html`

    iframe.onload = () => {
        iframe.contentWindow?.postMessage(
            { type: 'tellthedev:init', projectId },
            '*'
        )
    }

    // Add click event to toggle widget visibility
    feedbackButton.addEventListener('click', () => {
        const isVisible = container.classList.contains('show')
        if (isVisible) {
            container.classList.remove('show')
        } else {
            container.classList.add('show')
        }
    })

    container.appendChild(iframe)

    shadowRoot.appendChild(styleTag)
    shadowRoot.appendChild(feedbackButton)
    shadowRoot.appendChild(container)
}

// Start the initialization process
initializeWidget()