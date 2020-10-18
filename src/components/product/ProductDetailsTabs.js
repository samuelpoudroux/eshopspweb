import React from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ProductDetailsTabs = ({description}) => (
  <Tabs defaultActiveKey="1" >
    <TabPane  tab="Description" key="1">
<p>
{description !== "undefined" && description}
</p>    </TabPane>
    <TabPane tab="Livraison" key="2">
      Contenu relatif à la livraison
    </TabPane>
    <TabPane tab="Retour" key="3">
      Content relatif au retour
    </TabPane>
  </Tabs>
);

export default ProductDetailsTabs