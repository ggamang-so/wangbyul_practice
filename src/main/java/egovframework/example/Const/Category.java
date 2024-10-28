package egovframework.example.Const;

import lombok.Getter;

@Getter
public enum Category {
    DEVELOPMENT(1, "개발"),
    TECH_TREND(2, "기술트렌드"),
    PROJECT(3, "프로젝트"),
    TOOL(4, "도구"),
    PROBLEM_SOLVING(5, "문제해결"),
    CLOUD(6, "클라우드"),
    API(7, "API"),
    DATABASE(8, "데이터베이스"),
    SECURITY(9, "보안"),
    CAREER(10, "커리어");

    private final int value;
    private final String displayName;

    Category(int value, String displayName) {
        this.value = value;
        this.displayName = displayName;
    }

    public static String getDisplayName(int value) {
        for (Category category : values()) {
            if (category.getValue() == value) {
                return category.getDisplayName();
            }
        }
        return null;
    }

    public static Category getCategory(int value) {
        for (Category category : values()) {
            if (category.getValue() == value) {
                return category;
            }
        }
        return null;
    }

}