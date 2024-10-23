package egovframework.example.service;

public interface JwtService {
    String generateToken(String username);
    String extractMemberId(String token);
    boolean isTokenExpired(String token);
    boolean validateToken(String token, String username);
}
