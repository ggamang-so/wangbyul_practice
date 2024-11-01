function logout() {
    let loginId = localStorage.getItem("loginId")
    console.log(loginId)
    console.log(isLoggedIn)
    if (isLoggedIn && loginId) {
        console.log("logout processing")
        let logoutDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/api/member/logout",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json"
                    , headers: {
                        "refreshToken": localStorage.getItem("refreshToken"),
                        "loginId": localStorage.getItem("loginId")
                    },
                }
            }, requestEnd: function (e) {
                    alert("로그아웃 되었습니다.")
                    window.location.reload();
                }
        })

        logoutDataSource.read();
    }
    localStorage.removeItem("loginId");
    localStorage.removeItem("refreshToken");
}


let page_url;