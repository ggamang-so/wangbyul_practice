package egovframework.example.service.serviceImpl;

import egovframework.example.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtServiceImpl implements JwtService {
    // 비밀 키를 문자열로 지정

    private final byte[] SECRET_KEY_BYTES = "QGJYf3$hL#P9m!nVcU0x@wzQ4eX8s%2Z".getBytes(); // 문자열을 바이트 배열로 변환
    private final SecretKey SECRET_KEY = new SecretKeySpec(SECRET_KEY_BYTES, SignatureAlgorithm.HS256.getJcaName()); // 비밀 키 생성
    // 토큰 유효기간 설정 (1시간)
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간

    @Override
    public String generateToken(String memberId) {
        return Jwts.builder()
                .setSubject(memberId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY) // 비밀 키로 서명
                .compact();
    }

    @Override
    public String extractMemberId(String token) {
        return extractAllClaims(token).getSubject();
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser() // 최신 파서 빌더 사용
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public boolean validateToken(String token, String memberId) {
        final String extractedMemberId = extractMemberId(token);
        return (extractedMemberId.equals(memberId) && !isTokenExpired(token));
    }
}
