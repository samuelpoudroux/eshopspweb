import React from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ProductDetailsTabs = ({description}) => (
  <Tabs defaultActiveKey="1" >
    <TabPane  tab="Description" key="1">
<p>
{description}
</p>    </TabPane>
    <TabPane tab="Livraison" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Retour" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

export default ProductDetailsTabs