import { createBrowserRouter } from "react-router-dom";

import VoiceUpload from "../pages/voice/voiceUpload";
import VoiceResult from "../pages/voice/voiceResult";
import Loading from "../pages/voice/loading";
import Survey from "../pages/survey/survey";
import SurveyResult from "../pages/survey/surveyResult";
import Landing from "../pages/landing";
import FakeVoice from "../pages/voice/fakeVoice";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/voiceUpload",
    element: <VoiceUpload />,
  },
  {
    path: "/voiceResult/:taskId",
    element: <VoiceResult />,
  },
  {
    path: "/loading/:taskId",    
    element: <Loading />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
  {
    path: "/surveyResult",
    element: <SurveyResult />,
  },
  {
    path: "/fakeVoice",
    element: <FakeVoice />,
  },
]);

export default Router;
