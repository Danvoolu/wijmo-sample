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

//https://demo.grapecity.com/wijmo/demos/Grid/Columns/ColumnGroupsObjectModel/react

const MultiColumnHeaderCustom = () => {
  const [data] = useState(DataService.getData());
  const [allocGr, setAllocGr] = useState(false);
  const [comboData] = useState([
    'アメリカ',
    '日本',
    '中国',
    'ドイツ',
    'イギリス',
  ]);

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
        <wjInput.ComboBox itemsSource={comboData}></wjInput.ComboBox>
      </>
    );
  };

  const collapsedallocGrClicked = () => setAllocGr(!allocGr);

  const cellTemplate = (cell: any) => {
    const grid = cell.row.grid;
    const rowIdx = cell.row.index;
    const colIdx = cell.col.index;
    return (
      <span
        className={
          grid.getCellData(rowIdx, colIdx, false) > 0.2
            ? 'big-val'
            : 'small-val'
        }
      >
        {grid.getCellData(rowIdx, colIdx, true)}
      </span>
    );
  };

  return (
    <div className="container-fluid">
      <div>
        <FlexGrid
          headersVisibility="Column"
          showSelectedHeaders="All"
          alternatingRowStep={0}
          showMarquee={true}
          autoGenerateColumns={false}
          itemsSource={data}
        >
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
            <FlexGridColumnGroup
              binding="alloc.stock"
              header=" "
              format="p0"
              width={180}
            >
              <FlexGridCellTemplate
                cellType="ColumnHeader"
                autoSizeRows={false}
                template={headerallocGrTemplate2}
              />
            </FlexGridColumnGroup>
            <FlexGridColumnGroup header="詳細" align="center">
              <FlexGridColumnGroup
                binding="alloc.cash"
                header="キャッシュ"
                format="p0"
                width={100}
              >
                <FlexGridCellTemplate cellType="Cell" template={cellTemplate} />
              </FlexGridColumnGroup>
            </FlexGridColumnGroup>
          </FlexGridColumnGroup>
        </FlexGrid>
      </div>
    </div>
  );
};
export default MultiColumnHeaderCustom;
