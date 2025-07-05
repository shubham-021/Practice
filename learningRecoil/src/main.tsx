import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
    // <ContextProvider>
    <RecoilRoot>
        <App />
    </RecoilRoot>
    // </ContextProvider>
)
