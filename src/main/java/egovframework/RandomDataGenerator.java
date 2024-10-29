package egovframework;

import egovframework.example.util.PasswordUtil;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class RandomDataGenerator {

    public static void main(String[] args) {
        // CSV 파일 생성
        String memberCsvFile = "members.csv"; // Members CSV 파일
        String articleCsvFile = "articles.csv"; // Articles CSV 파일

        try (FileWriter memberWriter = new FileWriter(memberCsvFile);
             FileWriter articleWriter = new FileWriter(articleCsvFile)) {

            // Members CSV 파일의 헤더
            memberWriter.append("member_id,member_pw,name,email,birthday,nickname,created_at\n");

            // Articles CSV 파일의 헤더
            articleWriter.append("id,title,content,member_id,category,start_date,end_date,created_at\n");

            Random random = new Random();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String[] sampleNames = {"John", "Alice", "Bob", "Catherine", "David", "Eva", "Frank", "Grace", "Hannah", "Ian"};
            String[] sampleNicknames = {"Johnny", "Ally", "Bobby", "Cate", "Davey", "Evie", "Frankie", "Gracie", "Han", "Iggy"};

            List<String> memberIds = new ArrayList<>(); // member_id 목록

            // 200명의 멤버 데이터 생성
            for (int i = 0; i < 200; i++) {
                String memberId = "user" + String.format("%03d", i + 1); // 최대 8자 (예: user001)
                memberIds.add(memberId); // 생성한 member_id를 목록에 추가
                String memberPw = PasswordUtil.hashPassword("password" + i); // 비밀번호
                String name = getRandomString(sampleNames, 40); // 랜덤 이름 (최대 40자)
                String email = memberId + "@example.com"; // 이메일 (이메일 형식으로 대체)
                String birthday = dateFormat.format(generateRandomDate(1980, 2003)); // 랜덤 생일
                String nickname = getRandomString(sampleNicknames, 50); // 랜덤 별명 (최대 50자)
                String createdAt = timestampFormat.format(generateRandomTimestamp(2020, 2024)); // 랜덤 생성일

                memberWriter.append(String.join(",", memberId, memberPw, name, email, birthday, nickname, createdAt) + "\n");
            }

            // 200개의 아티클 데이터 생성
            for (int i = 0; i < 1000; i++) {
                int articleId = i + 6; // 아티클 ID
                String title = getRandomString("Title " + (i + 1), 255); // 랜덤 제목 (최대 255자)
                String content = getRandomString("This is the content of article " + (i + 1), 65535); // 랜덤 내용 (최대 65535자)
                String memberId = memberIds.get(random.nextInt(memberIds.size())); // 랜덤 멤버 ID (이미 생성된 member_id에서 선택)
                int category = random.nextInt(10) + 1; // 1~5 범위의 카테고리
                String startDate = dateFormat.format(generateRandomDate(2024, 2024)); // 랜덤 시작일
                String endDate = dateFormat.format(generateRandomDate(2025, 2025)); // 랜덤 종료일
                String articleCreatedAt = timestampFormat.format(generateRandomTimestamp(2024, 2024)); // 랜덤 아티클 생성일

                articleWriter.append(String.join(",", String.valueOf(articleId), title, content, memberId, String.valueOf(category), startDate, endDate, articleCreatedAt) + "\n");
            }

            System.out.println("CSV 파일이 생성되었습니다: " + memberCsvFile + " 및 " + articleCsvFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 랜덤 문자열 생성 (최대 길이 제한)
    private static String getRandomString(String input, int maxLength) {
        if (input.length() > maxLength) {
            return input.substring(0, maxLength);
        }
        return input;
    }

    private static String getRandomString(String[] samples, int maxLength) {
        String sample = samples[new Random().nextInt(samples.length)];
        return sample.length() > maxLength ? sample.substring(0, maxLength) : sample;
    }

    // 랜덤 날짜 생성
    private static Date generateRandomDate(int startYear, int endYear) {
        Random random = new Random();
        int year = random.nextInt(endYear - startYear + 1) + startYear;
        int dayOfYear = random.nextInt(365);
        Date date = new Date();
        date.setYear(year - 1900); // Date의 연도는 1900년 기준으로 설정
        date.setDate(dayOfYear);
        return date;
    }

    // 랜덤 타임스탬프 생성
    private static Date generateRandomTimestamp(int startYear, int endYear) {
        Random random = new Random();
        int year = random.nextInt(endYear - startYear + 1) + startYear;
        int month = random.nextInt(12); // 0-11 범위의 월
        int day = random.nextInt(28) + 1; // 1-28일 (모든 달을 고려)
        int hour = random.nextInt(24);
        int minute = random.nextInt(60);
        int second = random.nextInt(60);

        // Date 객체 생성
        return new Date(year - 1900, month, day, hour, minute, second);
    }
}
