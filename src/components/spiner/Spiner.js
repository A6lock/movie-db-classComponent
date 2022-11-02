/* eslint-disable import/no-extraneous-dependencies */
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 150,
    }}
    spin
  />
);
function Spiner() {
  return <Spin indicator={antIcon} />;
}

export default Spiner;
