import * as UI from 'grommet';
import * as ICON from 'grommet-icons';
import {
  makeTablePagesion,
  makeDaxiaoForm,
  makeDaxiaoLayerForm,
  makeShowList,
  makeShowSetting,
  makeTextTile,
  makeRowTable,
  makeTitleDataTable,
} from 'daxiao_ui_common/makeComponents';
const DaXiaoUI = {};
const config = {
  UI,
  ICON,
  DaXiaoUI,
};

const TablePagesion = makeTablePagesion(config);
DaXiaoUI.TablePagesion = TablePagesion;

const DaxiaoForm = makeDaxiaoForm(config);
DaXiaoUI.DaxiaoForm = DaxiaoForm;

const DaxiaoLayerForm = makeDaxiaoLayerForm(config);
DaXiaoUI.DaxiaoLayerForm = DaxiaoLayerForm;

const ShowList = makeShowList(config);
DaXiaoUI.ShowList = ShowList;

const ShowSetting = makeShowSetting(config);
DaXiaoUI.ShowSetting = ShowSetting;

const TextTile = makeTextTile(config);
DaXiaoUI.TextTile = TextTile;

const RowTable = makeRowTable(config);
DaXiaoUI.RowTable = RowTable;

const TitleDataTable = makeTitleDataTable(config);
DaXiaoUI.TitleDataTable = TitleDataTable;

export {
  TablePagesion,
  DaxiaoForm,
  DaxiaoLayerForm,
  ShowList,
  ShowSetting,
  TextTile,
  RowTable,
  TitleDataTable,
};
