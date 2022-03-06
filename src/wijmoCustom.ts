import { FlexGrid } from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { EventArgs } from '@grapecity/wijmo';

export class WijmoCustom {
  public static setDeleteColumn(
    grid: FlexGrid,
    itemCheckedProcess: (s: Selector, e: EventArgs) => void
  ) {
    const selector = new Selector(grid, {
      itemChecked: (s: Selector, e: EventArgs) => {
        itemCheckedProcess(s, e);
      },
      showCheckAll: false,
    });
  }
}
