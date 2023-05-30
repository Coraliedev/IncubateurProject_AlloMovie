import './App.css'
import Routes from './routes/index'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import AuthModalContext from './context/AuthModal'

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [modalVisibility, setModalVisibility] = useState("hidden");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app h-screen max-w-screen dark:bg-gray-900">
        <AuthModalContext.Provider value={{ modalVisibility, setModalVisibility }}>
          <Routes />
        </AuthModalContext.Provider>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
