import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//static components

// Navigations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Client
import Slogn from "./UI/ClientSide_UI/static_UI/slogn";
import MoneyInformation from "./UI/ClientSide_UI/dynamic_UI/moneyInformation";
import BodyHolder from "./UI/ClientSide_UI/dynamic_UI/BodyHolder";
import Donations from "./UI/ClientSide_UI/dynamic_UI/donationPage";
import Members from "./UI/ClientSide_UI/dynamic_UI/members";
import CommitHeads from "./UI/ClientSide_UI/dynamic_UI/commiteHead";
import Home from "./UI/ClientSide_UI/dynamic_UI/home";
import Rules from "./UI/ClientSide_UI/dynamic_UI/rules";
import AnnualMoneyInformation from "./UI/ClientSide_UI/dynamic_UI/annualSubmittedAmount";
// Admin
import AdminLogin from "./UI/AdminSide_UI/static_UI/login";
import AdminAddMember from "./UI/AdminSide_UI/static_UI/addMember";
import AdminAddSubmission from "./UI/AdminSide_UI/static_UI/addSubmissions";
import AdminAddAmount from "./UI/AdminSide_UI/static_UI/addAmount";
import AdminAllocateAmount from "./UI/AdminSide_UI/static_UI/addAllocateAmount";
import AdminAnnualSubmiitedAmount from "./UI/AdminSide_UI/static_UI/addAnnualSubmiitedAmount";
import AdminBodyHolder from "./UI/AdminSide_UI/static_UI/AdminBodyHolder";
import AdminUpdateMember from "./UI/AdminSide_UI/static_UI/updateMember";
import AdminLogout from "./UI/AdminSide_UI/static_UI/logout";
// root Application Fuction......
function App() {
  return (
    <Router>
      <div className="App">
        {/* icons and logo */}
        <Slogn />

        <Routes>
          <Route path="/" element={<BodyHolder />}>
            <Route path="home" element={<Home />}></Route>
            <Route path="login" element={<AdminLogin />}></Route>
            <Route
              path="moneyInformation"
              element={<MoneyInformation />}
            ></Route>
            <Route path="members" element={<Members />}></Route>
            <Route
              path="annualSubmittedAmount"
              element={<AnnualMoneyInformation />}
            ></Route>
            <Route path="heads" element={<CommitHeads />}></Route>
            <Route path="donation" element={<Donations />}></Route>
            <Route path="rule" element={<Rules />}></Route>
          </Route>
          {/* add admin Router */}
          <Route path="/admin" element={<AdminBodyHolder />}>
            <Route path="/login" element={<AdminLogin />}></Route>
            <Route path="/addMember" element={<AdminAddMember />}></Route>
            <Route
              path="/addSubmission"
              element={<AdminAddSubmission />}
            ></Route>
            <Route path="/addAmount" element={<AdminAddAmount />}></Route>
            <Route
              path="/allocateAmount"
              element={<AdminAllocateAmount />}
            ></Route>
            <Route path="/updateMember" element={<AdminUpdateMember />}></Route>
            <Route
              path="/annualSubmittedAmount"
              element={<AdminAnnualSubmiitedAmount />}
            ></Route>
            <Route path="/logout" element={<AdminLogout />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
