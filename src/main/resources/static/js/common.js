
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));  // JWT의 payload 부분을 디코딩
    } catch (e) {
        return null;
    }
}

function isTokenExpired(token) {
    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.exp) {
        return true;  // 토큰이 없거나 만료 시간이 없으면 만료로 처리
    }
    const currentTime = Date.now() / 1000;  // 현재 시간을 초 단위로 변환
    return decodedToken.exp < currentTime;  // 만료 시간을 현재 시간과 비교
}

// 로그인 상태 확인 로직
function checkLoginStatus() {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        logout();
        // 토큰이 없거나 만료된 경우
        return {isLoggedIn: false};
    }
    // 유효한 토큰이 있는 경우
    return {isLoggedIn: true, loginId: localStorage.getItem("loginId")};
}


function logout() {
    localStorage.removeItem("loginId");
    localStorage.removeItem("token");
}

const loginStatus = checkLoginStatus();
let page_url;