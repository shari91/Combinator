
import './App.css'
import { FileInput } from './components'

const App: React.FunctionComponent = () => {
  return (
    <div className='ms-Grid' dir='ltr'>
      <div className='ms-Grid-row'>
      <div className='ms-Grid-col ms-sm4 ms-lg4 ms-xl4'>

        </div>
        <div className='ms-Grid-col ms-sm4 ms-lg4 ms-xl4'>
          <FileInput />
        </div>
        <div className='ms-Grid-col ms-sm4 ms-lg4 ms-xl4'>

        </div>
      </div>
    </div>
  )
}

export default App
