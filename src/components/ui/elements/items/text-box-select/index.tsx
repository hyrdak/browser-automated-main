import { CodeOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Space } from "antd";

type Props = {
  options: { label: string; value: any }[];
};

export const TextBoxSelected = ({ options }: Props) => {
  return (
    <Space.Compact>
      <Input placeholder="input here" />
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={500}
        options={options}
        placement="bottomLeft"
      >
        <Button type="primary">
          <CodeOutlined />
        </Button>
      </AutoComplete>
    </Space.Compact>
  );
};
