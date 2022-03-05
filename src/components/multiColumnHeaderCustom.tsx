import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './multiColumnHeader.css';
import {
  FlexGrid,
  FlexGridColumnGroup,
  FlexGridCellTemplate,
} from '@grapecity/wijmo.react.grid';
import * as DataService from './data';
import * as wjInput from '@grapecity/wijmo.react.input';
import { CountryInfo } from './../interfaces';
import { Selector } from '@grapecity/wijmo.grid.selector';

//https://demo.grapecity.com/wijmo/demos/Grid/Columns/ColumnGroupsObjectModel/react

const countryInfos: CountryInfo[] = [
  {
    country: 'アメリカ',
    capital: 'ワシントンD.C.',
  },
  {
    country: '日本',
    capital: '東京',
  },
];

const MultiColumnHeaderCustom = () => {
  const [data] = useState(DataService.getData());
  const [allocGr, setAllocGr] = useState(false);
  const [comboData] = useState(['アメリカ', '日本']);
  const [selectedComboValue, setsSlectedComboValue] = useState(null);

  const headerallocGrTemplate = (cell: any) => {
    return (
      <>
        <input
          type="checkbox"
          checked={allocGr}
          onChange={collapsedallocGrClicked}
        />
        {cell.col.header}
      </>
    );
  };

  const headerallocGrTemplate2 = () => {
    return (
      <>
        <wjInput.ComboBox
          itemsSource={comboData}
          selectedIndexChanged={selectedIndexChanged}
        ></wjInput.ComboBox>
      </>
    );
  };

  const selectedIndexChanged = (sender: any) => {
    setsSlectedComboValue(sender.selectedValue);
  };

  const columnHeaderStringTemplate = () => {
    const capital = countryInfos.find(
      (x) => x.country === selectedComboValue
    )?.capital;
    return (
      <>
        <span>{capital}</span>
      </>
    );
  };

  const collapsedallocGrClicked = () => setAllocGr(!allocGr);

  const initGrid = (grid: any) => {
    let selector = new Selector(grid, {
      itemChecked: (s: any, e: any) => {},
      showCheckAll: false,
    });
  };

  return (
    <div className="container-fluid">
      <div>
        <FlexGrid
          initialized={initGrid}
          headersVisibility="Column"
          showSelectedHeaders="All"
          alternatingRowStep={0}
          showMarquee={true}
          autoGenerateColumns={false}
          itemsSource={data}
        >
          <FlexGridColumnGroup header=" " width={30} />
          <FlexGridColumnGroup binding="name" header="Name" width={150} />
          <FlexGridColumnGroup
            header="配当"
            align="center"
            collapseTo="alloc.amount"
            isCollapsed={allocGr}
          >
            <FlexGridCellTemplate
              cellType="ColumnHeader"
              autoSizeRows={false}
              template={headerallocGrTemplate}
            />
            <FlexGridColumnGroup binding="alloc.stock" header=" " width={180}>
              <FlexGridCellTemplate
                cellType="ColumnHeader"
                autoSizeRows={false}
                template={headerallocGrTemplate2}
              />
            </FlexGridColumnGroup>
            <FlexGridColumnGroup
              binding="alloc.cash"
              header="キャッシュ"
              width={100}
            >
              <FlexGridCellTemplate
                cellType="ColumnHeader"
                template={columnHeaderStringTemplate}
              />
            </FlexGridColumnGroup>
          </FlexGridColumnGroup>
        </FlexGrid>
      </div>
    </div>
  );
};
export default MultiColumnHeaderCustom;
