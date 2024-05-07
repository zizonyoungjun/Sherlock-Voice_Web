import { createBrowserRouter } from "react-router-dom";

import VoiceUpload from "../pages/voice/voiceUpload";
import VoiceResult from "../pages/voice/voiceResult";
import Loading from "../pages/voice/loading";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <VoiceUpload />,
  },
  {
    path: "/VoiceResult",
    element: <VoiceResult />,
  },
  {
    path: "/Loading",
    element: <Loading />,
  },
]);

export default Router;
