import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import faviconUrl from '@/images/icon128.png'

const existingIcon = document.querySelector('link[rel="icon"]') || document.createElement('link')
existingIcon.rel = 'icon'
existingIcon.type = 'image/png'
existingIcon.href = faviconUrl
if (!existingIcon.parentNode) {
  document.head.appendChild(existingIcon)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
