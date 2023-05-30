import './App.css'
import { AuthModalProvider } from './providers/AuthModalProvider';
import { AuthFirebaseProvider } from './providers/AuthFirebaseProvider';
import Routes from './routes/index'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app h-screen max-w-screen dark:bg-gray-900">
        <AuthFirebaseProvider>
        <AuthModalProvider>
          <Routes />
        </AuthModalProvider>
        </AuthFirebaseProvider>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  )
}

export default App
