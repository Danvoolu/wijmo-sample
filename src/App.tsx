import './App.css';
import FlexGridDeleteColumn from './components/flexGridDeleteColumn';
import MultiColumnHeader from './components/multiColumnHeader';
import MultiColumnHeaderCustom from './components/multiColumnHeaderCustom';
import { FlexGridColumnGroup } from '@grapecity/wijmo.react.grid';

const App = () => {
  const initialized = (grid: any) => {
    console.log('initialized');
  };

  return (
    <>
      <div>
        <MultiColumnHeader />
      </div>
      <div>
        <MultiColumnHeaderCustom />
      </div>
      <div>
        <FlexGridDeleteColumn initialized={initialized}>
          <FlexGridColumnGroup header="AAA" width={30} isReadOnly />
        </FlexGridDeleteColumn>
      </div>
    </>
  );
};

export default App;
