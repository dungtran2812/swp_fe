import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./Component/Dashboard";
import StyleDetail from "./Component/DesignStylePage/StyleDetail";
import Footer from "./Component/Footer";
import Banner from "./Component/Homepage/Banner";
import Customfeedback from "./Component/Homepage/Customfeedback";
import Designstyle from "./Component/Homepage/Designstyle";
import ProjectVideo from "./Component/Homepage/ProjectVideo";
import Quotationbanner from "./Component/Homepage/Quotationbanner";
import Sampledesign from "./Component/Homepage/Sampledesign";
import Workflowpage from "./Component/Homepage/Workflowpage";
import LoginPage from "./Component/LoginPage";
import PrjTypeDetail from "./Component/PrjTypeDetail";
import ProjectDetail from "./Component/ProjectDetail";
import SampleSearch from "./Component/SampleSearch";
import ScrollToTop from "./Component/ScrollToTop";
import SignUp from "./Component/SignUp";
import StaffDashboardPage from "./Component/Staff-Dashboard";
import ViewRegisterListPage from "./Component/Staff-Dashboard/pages/ViewRegisterList";
import StickyModal from "./Component/StickyModal";
import UserPage from "./Component/UserProfile/UserPage";
import Header from "./Component/header";

import ViewRegisterList from "./Component/ViewRegisterList/ViewRegisterList";
import ProductListPage from "./Component/Dashboard/pages/ProductListPage";
import ProfileSetting from "./Component/Dashboard/pages/ProfileSetting";
import RawMaterialListPage from "./Component/Dashboard/pages/RawMaterialList";
import UserListPage from "./Component/Dashboard/pages/UserListPage";
import QuoteStep from "./Component/QuoteStep";
import StaffQuotePage from "./Component/Staff-Dashboard/pages/StaffQuotePage";
import UserProjectPage from "./Component/UserProfile/UserProjectPage";

import {
  AdminProtected,
  Protected,
  StaffProtected,
  UnAuthenticated
} from "./Component/ProtectedLayer";
import Error403 from "./Error403";
import StaffProfilePage from "./Component/Staff-Dashboard/pages/StaffProfilePage";
import UserViewQuote from "./Component/ViewQuotePage/UserViewQuote";
import CreateSamplePage from "./Component/Staff-Dashboard/pages/CreateSamplePage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Sampledesign />
              <Banner />
              <Quotationbanner />
              <Designstyle />
              <Workflowpage />
              <ProjectVideo />
              <Customfeedback />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route path="/403" element={<Error403 />} />
        <Route path="/login" element={
        <UnAuthenticated>
        <LoginPage />
        </UnAuthenticated>
        } />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <AdminProtected>
              <DashboardPage />
            </AdminProtected>
          }
        />
        <Route
          path="/admin-manage-product"
          element={
            <AdminProtected>
              <ProductListPage />
            </AdminProtected>
          }
        />
        <Route
          path="/admin-manage-user"
          element={
            <AdminProtected>
              <UserListPage />
            </AdminProtected>
          }
        />
        <Route
          path="/admin-manage-rawMaterial"
          element={
            <AdminProtected>
              <RawMaterialListPage />
            </AdminProtected>
          }
        />
        <Route
          path="/admin-manage-profile"
          element={
            <AdminProtected>
              <ProfileSetting />
            </AdminProtected>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <StaffProtected>
              <StaffDashboardPage />
            </StaffProtected>
          }
        />
        <Route
          path="/staff/profile"
          element={
            <StaffProtected>
              <StaffProfilePage />
            </StaffProtected>
          }
        />
        <Route
          path={"/staff-dashboard/viewRegisterList"}
          element={
            <StaffProtected>
              <ViewRegisterListPage />
            </StaffProtected>
          }
        />
        <Route
          path={"/staff-dashboard/createsample"}
          element={
            <StaffProtected>
              <CreateSamplePage />
            </StaffProtected>
          }
        />

        {/* Guess k dc access */}
        <Route
          path={"/staff-dashboard/quotePage/:id"}
          element={
            <StaffProtected>
              <StaffQuotePage />
            </StaffProtected>
          }
        />

        <Route
          path="/quotepage"
          element={
            <Protected>
              <ScrollToTop />
              <Header />
              <QuoteStep />
              <Footer />
              <StickyModal />
            </Protected>
          }
        />
         <Route
          path={"/quotepage/:id"}
          element={
            <Protected>
            <ScrollToTop />
            <Header />
            <UserViewQuote />
            <Footer />
            <StickyModal />
          </Protected>           
          }
        />
        <Route
          path="/interior-construction/apartmentproject"
          element={
            <>
              <ScrollToTop />
              <Header />
              <PrjTypeDetail />
              <Footer />
              <StickyModal />
            </>
          }
        />

        <Route
          path={"/detail/:id"}
          element={
            <>
              <Header />
              <ProjectDetail />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"/style-detail/:id"}
          element={
            <>
              <Header />
              <StyleDetail />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"sampleprojectpage/detail/:id"}
          element={
            <>
              <Header />
              <ProjectDetail />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"sampleprojectpage/"}
          element={
            <>
              <Header />
              <SampleSearch />
              <Footer />
              <StickyModal />
            </>
          }
        />
        
        <Route
          path={"sampleprojectpage/:search"}
          element={
            <>
              <Header />
              <SampleSearch />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"profile"}
          element={
            <>
              <Header />
              <UserPage />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"user-project"}
          element={
            <>
              <Header />
              <UserProjectPage />
              <Footer />
              <StickyModal />
            </>
          }
        />
        <Route
          path={"viewRegisterList"}
          element={
            <StaffProtected>
              <ViewRegisterList />
            </StaffProtected>
          }
        />
        <Route
          path={"createsample"}
          element={
            <StaffProtected>
              <CreateSamplePage />
            </StaffProtected>
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
