package egovframework.example.config;

import egovframework.example.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.Optional;

@Component
public class MyInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    public MyInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean isLoggedIn = false; // 로그인 상태 초기화(미로그인 상태)

        String accessToken = Optional.ofNullable(getAccessToken(request))
                .filter(token -> !"null".equals(token))
                .orElse(null);
        System.out.println("login checking : " + request.getRequestURL().toString());
        System.out.println("accessToken : " + accessToken);
        String refreshToken= Optional.ofNullable(request.getHeader("refreshToken"))
                .filter(token -> !"null".equals(token))
                .orElse(null);
        System.out.println("refreshToken : " + refreshToken);
        String loginId = Optional.ofNullable(request.getHeader("loginId"))
                .filter(token -> !"null".equals(token))
                .orElse(null);
        System.out.println("loginId : " + loginId);

        // 1. accessToken은 있고 유효한 경우 로그인 상태로 변경하여 반환

        if (accessToken != null && !jwtService.isTokenExpired(accessToken) && jwtService.validateAccessToken(accessToken, loginId)) {
            System.out.println("1 : 로그인 ");
            isLoggedIn = true;
            request.setAttribute("isLoggedIn", isLoggedIn); //true
            return true;
        }

        // 2. accessToken 만료된경우, 리프레시토큰 유효성 검사해서 리프레시토큰이 없거나 무효하거나 로그인ID와 다르면 미로그인 처리
        if (refreshToken == null || loginId == null) {
            System.out.println("2 : 미로그인 ");
            request.setAttribute("isLoggedIn", isLoggedIn); //false
            return true;
        }

        if (jwtService.isTokenExpired(refreshToken) || !jwtService.validateRefreshToken(refreshToken, loginId)) {
            jwtService.deleteRefreshToken(loginId);
            System.out.println("3 : 미로그인");
            request.setAttribute("isLoggedIn", isLoggedIn); //false
            return true;
        }

        // 3. accessToken이 없거나 만료되었지만, refreshToken이 있고, 유효한경우 accessToken 재발행
        String newAccessToken = reissueAccessToken(refreshToken);
        if (newAccessToken != null) {
            isLoggedIn = true;
            addAccessTokenToResponse(response, newAccessToken);
            request.setAttribute("isLoggedIn", isLoggedIn);
            System.out.println("4 : 로그인 - accessToken재발급");
            return true;
        }

        request.setAttribute("isLoggedIn", isLoggedIn);
        System.out.println("5 : 미로그인");
        return true;
    }


    private String reissueAccessToken(String refreshToken) {
        return jwtService.generateAccessToken(jwtService.extractMemberId(refreshToken));
    }

    private String getAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            return Arrays.stream(cookies)
                    .filter(cookie -> "accessToken".equals(cookie.getName())) // accessToken 쿠키 필터링
                    .map(Cookie::getValue) // 쿠키 값 추출
                    .findFirst() // 첫 번째 결과만 가져옴
                    .orElse(null); // 없으면 null 반환

        }
        return null;
    }

    private void addAccessTokenToResponse(HttpServletResponse response, String newAccessToken) {
        Cookie cookie = new Cookie("accessToken", newAccessToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // HTTPS 환경에서만 사용
        cookie.setPath("/");
        cookie.setMaxAge(15 * 60); // 15분 유효 기간 설정
        response.addCookie(cookie);
    }

}