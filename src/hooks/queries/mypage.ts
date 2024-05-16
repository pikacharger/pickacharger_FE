import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import mypageApi from "@/apis/mypage";
import logout from "@/utils/logout";
import useCheckUserInfo from "../useCheckUserInfo";

const useLogout = () => {
    // const navigate = useNavigate();
    const { setUser } = useCheckUserInfo();
    const { mutate } = useMutation({
        mutationFn: () => mypageApi.logout(),
        onSuccess: () => {
            logout();
            setUser({
                id: null,
                username: "",
                email: "",
                nickName: "",
                chargerType: null,
                address: "",
                phoneNumber: "",
                profileImage: "",
            });
            // navigate("/");
            window.location.href = "/";
        },
        onError: (error: AxiosError<string>) => {
            console.log(error);
        },
    });
    return {
        logout: mutate,
    };
};

export { useLogout };
