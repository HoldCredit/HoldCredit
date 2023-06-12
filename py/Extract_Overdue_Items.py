from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
import pandas as pd

# Excel 파일에서 데이터 로드 및 전처리
df = pd.read_excel("C:\dev\HoldCredit\py\비실명화_data.xlsx")

# 첫번째 열 식별코드를 제외
if 'Unnamed: 0' in df.columns:
    df = df.drop(['Unnamed: 0'], axis=1)

# 뒤에서 1번째 연체 컬럼임.
X = df[df.columns[:-1]]  # 마지막 3개 컬럼 전까지가 항목
y = df[df.columns[-1]]   # 마지막 3번째 컬럼이 타겟 변수

# 문자열을 숫자로 변환 (타겟 변수)
if y.dtype == 'object':
    le = LabelEncoder()
    y = le.fit_transform(y.astype(str))

# 문자열을 숫자로 변환 (항목)
for col in X.columns:
    if X[col].dtype == 'object':
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))

# 학습용 데이터와 테스트용 데이터로 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 데이터 스케일링
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# 랜덤 포레스트를 학습하고 항목 중요도를 얻음
clf = RandomForestClassifier(n_estimators=1000, random_state=0)
clf.fit(X_train, y_train)

# 랜덤 포레스트 모델에서 항목의 중요도
importances = clf.feature_importances_

# 중요도가 0.01 이상인 항목 선택 (threshold=0.01), 전체 항목(threshold=0)
sfm = SelectFromModel(clf, threshold=0.00)
sfm.fit(X_train, y_train)

# 중요한 항목들의 인덱스와 이름을 얻음
important_feature_indices = sfm.get_support(indices=True)
important_feature_names = X.columns[important_feature_indices]

# 중요한 항목들의 이름과 인덱스를 출력
print("Important feature names: ", important_feature_names)
print("Important feature indices: ", important_feature_indices)

# 중요한 항목들의 중요도를 얻음
important_feature_importances = importances[important_feature_indices]

# 중요도를 퍼센트로 변환
important_feature_importances_percentage = 100.0 * (important_feature_importances / important_feature_importances.sum())

# 중요한 항목들의 이름, 인덱스, 중요도를 출력
important_features = pd.DataFrame({
    'Feature Name': important_feature_names,
    'Importance Percentage': important_feature_importances_percentage,
})
print(important_features)

# 항목 추출 -> 엑셀파일
important_features.to_excel('연체와 관련되 주요 컬럼 추출.xlsx', index=False)