import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Opener from './features/core/app/Opener';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <Opener />
  </QueryClientProvider>;
  
}

export default App;
