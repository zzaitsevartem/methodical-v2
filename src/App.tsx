import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Topic1 from "./pages/Themes/Topic1/Topic1";
import Topic2 from "./pages/Themes/Topic2/Topic2";
import Topic3 from "./pages/Themes/Topic3/Topic3";
import Topic4 from "./pages/Themes/Topic4/Topic4";
import Topic5 from "./pages/Themes/Topic5/Topic5";
import Topic6 from "./pages/Themes/Topic6/Topic6";
import Topic7 from "./pages/Themes/Topic7/Topic7";
import Topic8 from "./pages/Themes/Topic8/Topic8";
import Topic9 from "./pages/Themes/Topic9/Topic9";
import Topic10 from "./pages/Themes/Topic10/Topic10";

import Topic11 from "./pages/Themes/Topic11/Topic11";
import Topic12 from "./pages/Themes/Topic12/Topic12";
import Topic13 from "./pages/Themes/Topic13/Topic13";
import Topic14 from "./pages/Themes/Topic14/Topic14";
import Topic15 from "./pages/Themes/Topic15/Topic15";


const App: React.FC = () => {
    const [test1Passed, setTest1Passed] = useState<boolean>(false);
    const [test2Passed, setTest2Passed] = useState<boolean>(false);
    const [test3Passed, setTest3Passed] = useState<boolean>(false);
    const [test4Passed, setTest4Passed] = useState<boolean>(false);
    const [test5Passed, setTest5Passed] = useState<boolean>(false);
    const [test6Passed, setTest6Passed] = useState<boolean>(false);
    const [test7Passed, setTest7Passed] = useState<boolean>(false);
    const [test8Passed, setTest8Passed] = useState<boolean>(false);
    const [test9Passed, setTest9Passed] = useState<boolean>(false);
    const [test10Passed, setTest10Passed] = useState<boolean>(false);
    const [test11Passed, setTest11Passed] = useState<boolean>(false);
    const [test12Passed, setTest12Passed] = useState<boolean>(false);
    const [test13Passed, setTest13Passed] = useState<boolean>(false);
    const [test14Passed, setTest14Passed] = useState<boolean>(false);
    const [test15Passed, setTest15Passed] = useState<boolean>(false);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topic1" element={<Topic1 testPassed={test1Passed} setTestPassed={setTest1Passed} />} />
                <Route path="/topic2" element={<Topic2 testPassed={test2Passed} setTestPassed={setTest2Passed} />} />
                <Route path="/topic3" element={<Topic3 testPassed={test3Passed} setTestPassed={setTest3Passed} />} />
                <Route path="/topic4" element={<Topic4 testPassed={test4Passed} setTestPassed={setTest4Passed} />} />
                <Route path="/topic5" element={<Topic5 testPassed={test5Passed} setTestPassed={setTest5Passed} />} />
                <Route path="/topic6" element={<Topic6 testPassed={test6Passed} setTestPassed={setTest6Passed} />} />
                <Route path="/topic7" element={<Topic7 testPassed={test7Passed} setTestPassed={setTest7Passed} />} />
                <Route path="/topic8" element={<Topic8 testPassed={test8Passed} setTestPassed={setTest8Passed} />} />
                <Route path="/topic9" element={<Topic9 testPassed={test9Passed} setTestPassed={setTest9Passed} />} />
                <Route path="/topic10" element={<Topic10 testPassed={test10Passed} setTestPassed={setTest10Passed} />} />
                <Route path="/topic11" element={<Topic11 testPassed={test11Passed} setTestPassed={setTest11Passed} />} />
                <Route path="/topic12" element={<Topic12 testPassed={test12Passed} setTestPassed={setTest12Passed} />} />
                <Route path="/topic13" element={<Topic13 testPassed={test13Passed} setTestPassed={setTest13Passed} />} />
                <Route path="/topic14" element={<Topic14 testPassed={test14Passed} setTestPassed={setTest14Passed} />} />
                <Route path="/topic15" element={<Topic15 testPassed={test15Passed} setTestPassed={setTest15Passed} />} />

            </Routes>
        </BrowserRouter>
    );
};
export default App;
