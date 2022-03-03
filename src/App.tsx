import './App.css';
import MultiColumnHeader from './components/multiColumnHeader';
import MultiColumnHeaderCustom from './components/multiColumnHeaderCustom';

const App = () => {
  return (
    <>
      <div>
        <MultiColumnHeader />
      </div>
      <div>
        <MultiColumnHeaderCustom />
      </div>
    </>
  );
};

export default App;
