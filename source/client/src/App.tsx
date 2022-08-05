import { useState } from "react";
import "antd/dist/antd.css";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import RecordSearchPage from "./RecordSearchPage";
import Sider from "antd/lib/layout/Sider";
import "./App.css";
import AnchorLink from "antd/lib/anchor/AnchorLink";

export interface buyer {
  name: string;
  id: string;
}

function App() {
  const [selectedBuyerState, setSelectedBuyerState] = useState<buyer | null>();

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[{ label: "Procurement search", key: "search" }]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Stotles</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedBuyerState ? (
                <Button
                  style={{ border: 0, height: "unset", padding: 0 }}
                  type="text"
                  onClick={() => setSelectedBuyerState(null)}
                >
                  Procurement search
                </Button>
              ) : (
                "Procurement search"
              )}
            </Breadcrumb.Item>
            {selectedBuyerState && (
              <Breadcrumb.Item>{selectedBuyerState.name}</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <RecordSearchPage
              selectedBuyer={selectedBuyerState}
              onBuyerClick={(buyer: buyer) => setSelectedBuyerState(buyer)}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
