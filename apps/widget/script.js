const currentScript = document.currentScript
const projectId = currentScript?.getAttribute('data-project-id')

if (!projectId) {
    console.warn('[TellTheDev] No project ID provided')
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
    }

  .tellthedev-widget-container iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
`

const container = document.createElement('div')
container.className = 'tellthedev-widget-container';

const iframe = document.createElement('iframe')
iframe.src = `https://tellthedev.vercel.app/widget/iframe.html`

iframe.onload = () => {
    iframe.contentWindow?.postMessage(
        { type: 'tellthedev:init', projectId },
        '*'
    )
}

container.appendChild(iframe)

shadowRoot.appendChild(styleTag)
shadowRoot.appendChild(container)