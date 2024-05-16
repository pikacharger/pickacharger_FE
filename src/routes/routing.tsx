import { createBrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/common/layout/Layout.tsx";
import SignUp from "@/pages/signUp/SignUp.tsx";
import ReviewWrite from "@/pages/reviewWrite/ReviewWrite.tsx";
import ReviewManage from "@/pages/reviewManage/ReviewManage.tsx";
import ReviewDetail from "@/pages/reviewDetail/ReviewDetail.tsx";
import ReviewEdit from "@/pages/reviewEdit/ReviewEdit.tsx";
import Login from "@/pages/login/Login";
import MyFavorites from "@/pages/myFavorites/MyFavorites.tsx";
import ChatRoom from "@/pages/chatRoom/ChatRoom.tsx";
import Home from "@/pages/home/Home.tsx";
import ChatList from "@/pages/chatList/ChatList.tsx";
import RegisterCharger from "@/pages/registerCharger/RegisterCharger.tsx";
import ManagingCharger from "@/pages/managingCharger/ManagingCharger.tsx";
import ChargerDetail from "@/pages/chargerDetail/ChargerDetail";
import ChargerEdit from "@/pages/chargerEdit/ChargerEdit";
import ChargerReviewList from "@/pages/chargerReviewList/ChargerReviewList";
import MyPage from "@/pages/myPage/MyPage.tsx";
import MyInfo from "@/pages/myInfo/MyInfo.tsx";
import NotFound from "@/pages/notFound/NotFound.tsx";
import ErrorPage from "@/pages/Error/ErrorPage";
import Private from "./private";
import ReviewSearchChargerList from "@/components/pages/reviewWrite/searchChargerList/SearchChargerList";
import Charger from "@/pages/charger/Charger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/charger/*",
        element: (
          <>
            <Routes>
              <Route path="/:viewType" element={<Charger />} />
              <Route path="/detail/:id" element={<ChargerDetail />} />
              <Route path="/:id/reviews" element={<ChargerReviewList />} />
            </Routes>
          </>
        ),
      },
      {
        path: "/managing-charger",
        element: (
          <Private>
            <ManagingCharger />
          </Private>
        ),
      },
      // 채팅
      {
        path: "/chat-list/*",
        element: (
          <Private>
            <Routes>
              <Route path="" element={<ChatList />} />
              <Route path="/:id" element={<ChatRoom />} />
            </Routes>
          </Private>
        ),
      },
      // 마이페이지
      {
        path: "/mypage/*",
        element: (
          <Private>
            <Routes>
              <Route path="" element={<MyPage />} />
              <Route path="/favorites" element={<MyFavorites />} />
              <Route path="/myinfo" element={<MyInfo />} />
            </Routes>
          </Private>
        ),
      },
      // 리뷰
      {
        path: "/review/*",
        element: (
          <>
            <Routes>
              <Route path="/:id" element={<ReviewDetail />} />
              <Route
                path="/manage"
                element={
                  <Private>
                    <ReviewManage />
                  </Private>
                }
              />
              <Route
                path="/write/list"
                element={
                  <Private>
                    <ReviewSearchChargerList />
                  </Private>
                }
              />
            </Routes>
          </>
        ),
      },
    ],
  },
  {
    path: "charger/:id/edit",
    element: (
      <Private>
        <ChargerEdit />
      </Private>
    ),
  },
  {
    path: "/register-charger",
    element: (
      <Private>
        <RegisterCharger />
      </Private>
    ),
  },
  {
    path: "/review/write",
    element: (
      <Private>
        <ReviewWrite />
      </Private>
    ),
  },
  {
    path: "/review/:id/edit",
    element: (
      <Private>
        <ReviewEdit />
      </Private>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
