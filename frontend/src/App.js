// 
//  Application based on https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-react-samples/react-router-sample
//
import { Routes , Route } from "react-router-dom";
// Material-UI imports
//import Grid from "@material-ui/core/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
//import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Home } from "./pages/Home";
//import { Dashboard } from "./pages/Dashboard";
import { Logout } from "./pages/Logout";

// Class-based equivalents of "Profile" component
//import { ProfileWithMsal } from "./pages/ProfileWithMsal";
//import { ProfileRawContext } from "./pages/ProfileRawContext";
//import { ProfileUseMsalAuthenticationHook } from "./pages/ProfileUseMsalAuthenticationHook";

function App( { pca }) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  // const history = useHistory();
  // const navigationClient = new CustomNavigationClient(history);
  // pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <PageLayout>
        {/*<Grid container justifyContent="center">*/}
          <Pages />
        {/*</Grid>*/}
      </PageLayout>
    </MsalProvider>
  );
}

function Pages() {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/*<Route path="/profileWithMsal">
        <ProfileWithMsal />
      </Route>
      <Route path="/profileRawContext">
        <ProfileRawContext />
      </Route>
      <Route path="/profileUseMsalAuthenticationHook">
        <ProfileUseMsalAuthenticationHook />
      </Route>*/}
      <Route path="/logout" element={<Logout />} />
          
      <Route path="/" element={<Home />} />
      </Routes>
  )
}
 
export default App;