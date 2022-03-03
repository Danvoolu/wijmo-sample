import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './multiColumnHeader.css';
import * as React from 'react';
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
  const [short, setShort] = useState(true);
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

  const headerShortTemplate = (cell: any) => {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          checked={short}
          onChange={collapsedShortClicked}
        />
        {cell.col.header}
      </React.Fragment>
    );
  };

  const collapsedallocGrClicked = () => setAllocGr(!allocGr);
  const collapsedShortClicked = () => setShort(!short);

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
            binding="currency"
            header="通貨"
            width={80}
            align="center"
          />
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
              width={80}
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
          <FlexGridColumnGroup header="実績" align="center">
            <FlexGridColumnGroup
              header="短期"
              align="center"
              collapseTo="perf.ytd"
              isCollapsed={short}
            >
              <FlexGridCellTemplate
                cellType="ColumnHeader"
                autoSizeRows={false}
                template={headerShortTemplate}
              />
              <FlexGridColumnGroup
                binding="perf.ytd"
                header="年初来"
                format="p2"
                width={100}
                cssClass="main-column"
              />
              <FlexGridColumnGroup
                binding="perf.m1"
                header="1ヶ月"
                format="p2"
                width={80}
              />
            </FlexGridColumnGroup>
          </FlexGridColumnGroup>
        </FlexGrid>
      </div>
    </div>
  );
};
export default MultiColumnHeaderCustom;
