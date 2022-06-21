import 'antd/dist/antd.css';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MailOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import Invoices, { Invoice } from "./Invoices";
import { Layout, Menu } from 'antd';
import { NavLink as Link, Route, Routes } from "react-router-dom";

import LoginPage from "./LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import ProtectedPage from "./ProtectedPage";
import React from "react";
import RouteAsObj from "./RouteAsObj";
import Search from "./Search";
import Translator from "./pages/Translator";
// import loadable from "@loadable/component";
import logo from './assets/logo.png'
const { Header, Content, Footer, Sider } = Layout;


import { N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';
import battery from './design-system/menu/examples/icons/battery.png';
import cloud from './design-system/menu/examples/icons/cloud.png';
import Drill from './design-system/menu/examples/icons/drill.png';
import koala from './design-system/menu/examples/icons/koala.png';
import ui from './design-system/menu/examples/icons/ui.png';
import wallet from './design-system/menu/examples/icons/wallet.png';
import Yeti from './design-system/menu/examples/icons/yeti.png';


const ImgIcon = ({ src, alt }) => (
  <img alt={alt} src={src} height={24} width={24} style={{ borderRadius: 3 }} />
);

const items= [
  {
    label: (  <Link to="/" end>  Home</Link>),
    key: 'mail',
    icon: <MailOutlined />,
  },

  {
    label: ( <Link to="/translator"  end>  Translator</Link>),
    key: 'translator',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    label: ( <Link to="/public" end>  Image Сompressor</Link>),
    key: 'Image_compressor',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    label: ( <Link to="/about"  end>  Javascript beautifier</Link>),
    key: 'about',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         {
  //           label: 'Option 3',
  //           key: 'setting:3',
  //         },
  //         {
  //           label: 'Option 4',
  //           key: 'setting:4',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
];


 

const Loading = () => {
  return <div>Loading...</div>;
};

// const Dashboard = loadable(() => import("./Dashboard.js"), {
//   fallback: <Loading />,
// });

function App() {
  return (



    
    <Layout hasSider >
    <Sider
    width='250'
    theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
         color: token('color.text', N800),
      backgroundColor: token('elevation.surface.overlay', '#fff'),
      boxShadow: token(
        'elevation.shadow.overlay',
        '0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)',
      ),
      borderRadius: 4,
 


      }}
    >
      <div className="logo">

<img src={logo} style={{maxWidth:'100%'}} />


      </div>
      <Menu  mode="inline" defaultSelectedKeys={['4']} items={items} />
     {/* <MenuGroup>
      <Section title="Starred">
       <Link to="/translator"  end> 
        <ButtonItem
          iconBefore={<ImgIcon src={Yeti} alt={'Yeti'} />}
          description="Next-gen software project"
        >
          
          Translator
        </ButtonItem>
        </Link>
        <ButtonItem
          iconBefore={<ImgIcon src={Drill} alt={'Drill'} />}
          description="Next-gen service desk"
        >
          Analytics Platform
        </ButtonItem>
      </Section>
      <Section title="Recent">
        <ButtonItem
          iconBefore={<ImgIcon src={battery} alt={'Battery'} />}
          description="Next-gen software project"
        >
          Fabric Editor
        </ButtonItem>
        <ButtonItem
          iconBefore={<ImgIcon src={cloud} alt={'Cloud'} />}
          description="Classic business project"
        >
          Content Services
        </ButtonItem>
        <ButtonItem
          iconBefore={<ImgIcon src={wallet} alt={'Wallet'} />}
          description="Next-gen software project"
        >
          Trinity Mobile
        </ButtonItem>
        <ButtonItem
          iconBefore={<ImgIcon src={koala} alt={'Koala'} />}
          description="Classic service desk"
        >
          Customer Feedback
        </ButtonItem>
        <ButtonItem
          iconBefore={<ImgIcon src={ui} alt={'UI icon'} />}
          description="Classic software project"
        >
          Design System
        </ButtonItem>
      </Section>
      <Section hasSeparator>
      
        <ButtonItem>Create project</ButtonItem>
      </Section>
    </MenuGroup>*/}

      {/* <Link to="#">
    <Menu.Item>Your Content</Menu.Item> 
  </Link>
  <Link to="#">
    <Menu.Item>Your Content</Menu.Item> 
  </Link> */}
      <Footer
       style={{ position: 'absolute', zIndex: 1, width: '100%',textAlign: 'center', bottom:0, backgroundColor:'white',paddingLeft:'6px',paddingRight:'6px' }}
      >
       Made with <span>&#10084;</span> by indegene
      </Footer>
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 250,
        height: '100vh',
     
      
     
      }}
    >
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
           <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/about" element={<About />}></Route>
        {/*  <Route path="/dashboard/*" element={<Dashboard />}></Route>*/}
          <Route path="/object_route/*" element={<RouteAsObj />}></Route>
       {/*   <Route path="/search" element={<Search />}></Route>*/}
          <Route path="/public" element={<PublicPage />}></Route>
          <Route path="/translator" element={<Translator />}></Route>
          
     {/*     <Route
            path="protected"
            element={
              <PrivateRoute>
                <ProtectedPage x={1} />
              </PrivateRoute>
            }
          ></Route>*/}
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={<p>Please select an invoice above</p>}
            ></Route>
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
         
        </div>
      </Content>
    
    </Layout>
  </Layout>
  );
}

export const Home = () => {
  return <div>You are in Home page</div>;
};
export const About = () => {
  return <div>This is the page where you put details about yourself</div>;
};
export const PublicPage = () => {
  return <div>This page can be accessed by anyone</div>;
};
export const NotFound = () => {
  return <div>This is a 404 page</div>;
};

export default App;
