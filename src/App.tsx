import './App.css'
import Routes from './routes/index'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Auth from './components/Auth';

const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app h-screen min-w-screen dark:bg-gray-900">
        <Routes />
        <Auth />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider >
  )
}

export default App
