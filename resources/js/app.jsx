import './bootstrap'
import '../css/app.css'

import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ThemeProvider } from './Context/ThemeContext'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ModalProvider } from './Context/ModalContext'

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup ({ el, App, props }) {
    return render(
      <ThemeProvider>
        <ModalProvider>
          <App {...props} />
        </ModalProvider>
      </ThemeProvider>,
      el
    )
  }
})

InertiaProgress.init({ color: '#4B5563' })
