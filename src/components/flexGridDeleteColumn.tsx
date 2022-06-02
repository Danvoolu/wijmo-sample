import { useState } from 'react';
import '@grapecity/wijmo.styles/wijmo.css';
import { FlexGrid, FlexGridColumnGroup } from '@grapecity/wijmo.react.grid';
import * as DataService from './data';
import { Selector } from '@grapecity/wijmo.grid.selector';

const FlexGridDeleteColumn = (props: any) => {
  const { children, initialized, ...other } = props;

  const [data] = useState(DataService.getData());

  const initialized1 = (grid: any) => {
    const selector = new Selector(grid, {
      // itemChecked: (s: Selector, e: EventArgs) => {
      //   itemCheckedProcess(s, e);
      // },
      showCheckAll: false,
    });
    initialized(grid);
  };

  return (
    <div className="container-fluid">
      <FlexGrid
        initialized={initialized1}
        headersVisibility="Column"
        showSelectedHeaders="All"
        alternatingRowStep={0}
        showMarquee={true}
        autoGenerateColumns={false}
        itemsSource={data}
        {...other}
      >
        <FlexGridColumnGroup header=" " width={30} isReadOnly />
        {children}
      </FlexGrid>
    </div>
  );
};
export default FlexGridDeleteColumn;
