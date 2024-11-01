package egovframework.example.service.serviceImpl;

import egovframework.example.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {

    // 비밀 키를 문자열로 지정

    private final byte[] SECRET_KEY_BYTES = "QGJYf3$hL#P9m!nVcU0x@wzQ4eX8s%2Z".getBytes(); // 문자열을 바이트 배열로 변환
    private final SecretKey SECRET_KEY = new SecretKeySpec(SECRET_KEY_BYTES, SignatureAlgorithm.HS256.getJcaName()); // 비밀 키 생성
    // 토큰 유효기간 설정 (1시간)
    private final long ACCESSTOKEN_EXPIRATION_TIME = 1000 * 60 * 15; // 15분
    private final long REFRESHTOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7일
    private final RedisTemplate<String, String> redisTemplate;

    public JwtServiceImpl(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public String generateAccessToken(String memberId) {
        return Jwts.builder()
                .subject(memberId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + ACCESSTOKEN_EXPIRATION_TIME))
                .signWith(SECRET_KEY) // 비밀 키로 서명
                .compact();
    }
    @Override
    public String generateRefreshToken(String memberId) {
        return Jwts.builder()
                .subject(memberId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + REFRESHTOKEN_EXPIRATION_TIME))
                .signWith(SECRET_KEY) // 비밀 키로 서명
                .compact();
    }

    @Override
    public String extractMemberId(String token) {
        return extractAllClaims(token).getSubject();
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser() // 최신 파서 빌더 사용
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public boolean validateAccessToken(String AccessToken, String memberId) {
        final String extractedMemberId = extractMemberId(AccessToken);
        return (extractedMemberId.equals(memberId) && !isTokenExpired(AccessToken));
    }
    @Override
    public boolean isPresentRefreshToken(String loginId){
        return Boolean.TRUE.equals(redisTemplate.hasKey(loginId));
    }

    @Override
    public boolean validateRefreshToken(String refreshToken, String memberId) {
        String storedRefreshToken = getRefreshToken(memberId);
        return refreshToken.equals(storedRefreshToken);
    }


    @Override
    public String getRefreshToken(String memberId) {
        return redisTemplate.opsForValue().get(memberId);
    }

    @Override
    public void deleteRefreshToken(String memberId) {
        if (isPresentRefreshToken(memberId)) {
            redisTemplate.delete(memberId);
        }

    }






}
