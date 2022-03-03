import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './multiColumnHeader.css';
import * as React from 'react';
import { FlexGrid, FlexGridColumnGroup, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
import * as DataService from './data';

//https://demo.grapecity.com/wijmo/demos/Grid/Columns/ColumnGroupsObjectModel/react

const MultiColumnHeader = ()=> {
    const [data, setData] = useState(DataService.getData());
    const [animated, setAnimated] = useState(true);
    const [useCellTemplates, setUseCellTemplates] = useState(true);
    const [allocGr, setAllocGr] = useState(false);
    const [short, setShort] = useState(true);
    const [long, setLong] = useState(true);
    
    const headerallocGrTemplate = (cell: any) => {
        return <><input type="checkbox" checked={allocGr} onChange={collapsedallocGrClicked}/>{cell.col.header}</>
    }

    const headerShortTemplate = (cell: any) => {
        return <React.Fragment><input type="checkbox" checked={short} onChange={collapsedShortClicked}/>{cell.col.header}</React.Fragment>;
    }

    const headerLongTemplate = (cell: any) => {
        return <React.Fragment><input type="checkbox" checked={long} onChange={collapsedLongClicked}/>{cell.col.header}</React.Fragment>;
    }

    const animationClicked = () => setAnimated(!animated);
    const templateClicked = () => setUseCellTemplates(!useCellTemplates);
    const collapsedallocGrClicked = () => setAllocGr(!allocGr);
    const collapsedShortClicked = () => setShort(!short);
    const collapsedLongClicked = () => setLong(!long);

    const cellTemplate = (cell: any) => {
        const grid = cell.row.grid;
        const rowIdx = cell.row.index;
        const colIdx = cell.col.index;
        return <span className={grid.getCellData(rowIdx, colIdx, false) > .2 ? 'big-val' : 'small-val'}>
        {grid.getCellData(rowIdx, colIdx, true)}
    </span>;
    };

    return(
        <div className="container-fluid">
            <label>
                折りたたみ/展開時のアニメーションを有効にする
                <input type="checkbox" checked={animated} onChange={animationClicked}/>
            </label>
            <label>
                セルテンプレートを利用する
                <input type="checkbox" checked={useCellTemplates} onChange={templateClicked}/>
            </label>
            <div className={animated ? 'animated' : ''}>
                <FlexGrid headersVisibility="Column" showSelectedHeaders="All" alternatingRowStep={0} showMarquee={true} autoGenerateColumns={false} itemsSource={data}>
                    <FlexGridColumnGroup binding="name" header="Name" width={150}/>
                    <FlexGridColumnGroup binding="currency" header="通貨" width={80} align="center"/>
                    <FlexGridColumnGroup header="配当" align="center" collapseTo="alloc.amount" isCollapsed={allocGr}>
                        <FlexGridCellTemplate cellType="ColumnHeader" autoSizeRows={false} template={useCellTemplates ? headerallocGrTemplate : null}/>
                        <FlexGridColumnGroup binding="alloc.stock" header="株式" format="p0" width={80}>
                            <FlexGridCellTemplate cellType="Cell" template={useCellTemplates ? cellTemplate : null}/>
                        </FlexGridColumnGroup>
                        <FlexGridColumnGroup binding="alloc.bond" header="債券" format="p0" width={80}>
                            <FlexGridCellTemplate cellType="Cell" template={useCellTemplates ? cellTemplate : null}/>
                        </FlexGridColumnGroup>
                        <FlexGridColumnGroup header="詳細" align="center">
                            <FlexGridColumnGroup binding="alloc.cash" header="キャッシュ" format="p0" width={100}>
                                <FlexGridCellTemplate cellType="Cell" template={useCellTemplates ? cellTemplate : null}/>
                            </FlexGridColumnGroup>
                            <FlexGridColumnGroup binding="alloc.other" header="その他" format="p0" width={80}>
                                <FlexGridCellTemplate cellType="Cell" template={useCellTemplates ? cellTemplate : null}/>
                            </FlexGridColumnGroup>
                        </FlexGridColumnGroup>
                        <FlexGridColumnGroup binding="alloc.amount" header="金額" format="c0" width={100} cssClass="main-column"/>
                    </FlexGridColumnGroup>
                    <FlexGridColumnGroup header="実績" align="center">
                        <FlexGridColumnGroup header="短期" align="center" collapseTo="perf.ytd" isCollapsed={short}>
                        <FlexGridCellTemplate cellType="ColumnHeader" autoSizeRows={false} template={useCellTemplates ? headerShortTemplate : null}/>
                            <FlexGridColumnGroup binding="perf.ytd" header="年初来" format="p2" width={100} cssClass="main-column"/>
                            <FlexGridColumnGroup binding="perf.m1" header="1ヶ月" format="p2" width={80}/>
                        </FlexGridColumnGroup>
                        <FlexGridColumnGroup header="長期" align="center" collapseTo="perf.m12" isCollapsed={long}>
                        <FlexGridCellTemplate cellType="ColumnHeader" autoSizeRows={false} template={useCellTemplates ? headerLongTemplate : null}/>
                            <FlexGridColumnGroup binding="perf.m6" header="長期" format="p2" width={80}/>
                            <FlexGridColumnGroup binding="perf.m12" header="1年" format="p2" width={100} cssClass="main-column"/>
                        </FlexGridColumnGroup>
                    </FlexGridColumnGroup>
                </FlexGrid>
            </div>
        </div>
    );
}
export default MultiColumnHeader;
