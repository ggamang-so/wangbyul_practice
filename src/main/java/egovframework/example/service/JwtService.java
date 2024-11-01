package egovframework.example.service;

public interface JwtService {
    String generateAccessToken(String username);

    String generateRefreshToken(String memberId);

    String extractMemberId(String token);
    boolean isTokenExpired(String token);
    boolean validateAccessToken(String token, String username);
    boolean validateRefreshToken(String token, String username);
    String getRefreshToken(String memberId);
    boolean isPresentRefreshToken(String loginId);
    void deleteRefreshToken(String memberId);
}
