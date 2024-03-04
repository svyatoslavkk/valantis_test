import Card from "./components/Card/Card"
import TopBar from "./components/TopBar/TopBar"
import { DataProvider } from "./context/context"

function App() {

  return (
    <DataProvider>
      <div className="container">
        <TopBar />
        <Card />
      </div>
    </DataProvider>
  )
}

export default App
