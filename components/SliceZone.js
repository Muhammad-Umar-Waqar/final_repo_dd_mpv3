import { Box } from '@mui/material';
import {
  AlertBox,
  AmazonProduct,
  CustomTable,
  ImageSlice,
  InfoBox,
  InsertForm,
  PaperForm,
  QuoteBox,
  SuccessBox,
  Table2Col,
  Table3Col,
  Table4Col,
  Table5Col,
  Table6Col,
  Text,
  TextRich,
  VideoBlock,
  WarningBox,
} from './slices';

const SLICE_COMPONENTS = {
  alert_text: AlertBox,
  amazon_product: AmazonProduct,
  custom_table: CustomTable,
  image: ImageSlice,
  info_box: InfoBox,
  insert_form: InsertForm,
  paperform: PaperForm,
  quote: QuoteBox,
  success_box: SuccessBox,
  table: Table2Col,
  table_3col: Table3Col,
  table__4col_: Table4Col,
  table_5_col: Table5Col,
  table__6_col_: Table6Col,
  text: Text,
  text__rich_: TextRich,
  video_block: VideoBlock,
  warning_box: WarningBox,
};

const SliceZone = ({ allSlices }) => {
  const renderSlice = (slice) => {
    const SliceComponent = SLICE_COMPONENTS[slice.slice_type];
    return SliceComponent ? <SliceComponent key={slice.id} input={slice} /> : null;
  };

  return (
    <div>
      {allSlices.map(renderSlice)}
    </div>
  );
};

export default SliceZone; 