import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUnsavedChanges } from "./UnsavedChanges";

const { Header, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDirty, setShowModal, setPendingPath } = useUnsavedChanges();
  const selectedKey = location.pathname.includes("employee")
    ? "employees"
    : "cafes";

  const handleHeaderLink = (path: string) => {
  if (isDirty) {
    setPendingPath(path);
    setShowModal(true);
  } else {
    navigate(path);
  }
};

  return (
    <Layout>
      <Header style={{ padding: "0 24px", height: 64 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
          items={[
            {
              key: "cafes",
              label: <span onClick={() => handleHeaderLink("/cafes")}>Cafes</span>
            },
            {
              key: "employees",
              label: <span onClick={() => handleHeaderLink("/employees")}>Employees</span>
            }
          ]}
        />
      </Header>
      <Content style={{ padding: '48px 48px' }}>
        <div>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
