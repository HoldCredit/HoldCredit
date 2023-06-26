import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 데이터 로드
train_data = pd.read_excel('train_data.xlsx')
train_data = train_data.drop(['SP','결과값(연체회차)'], axis=1)
train_data = pd.get_dummies(train_data, columns=['AD_NO', 'LIV_ADD', 'RES_ADD', 'ADD_YN'])

# 입력 (X) / 출력 (Y) 변수 분리
X = train_data.drop('CB', axis=1)
y = train_data['CB']

# 학습 데이터와 검증 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

features = X.columns.tolist()

# 특성 스케일링
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)



### Random Forest

# 랜덤포레스트 학습
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# 랜덤포레스트 예측
rf_train_pred = rf.predict(X_train)
rf_test_pred = rf.predict(X_test)

# 랜덤포레스트 정확도 계산
rf_train_accuracy = accuracy_score(y_train, rf_train_pred)
rf_test_accuracy = accuracy_score(y_test, rf_test_pred)
print(f'Random Forest Train Accuracy: {rf_train_accuracy:.4f}')
print(f'Random Forest Test Accuracy: {rf_test_accuracy:.4f}')

# 피처 중요도 확인
rf_feature_importances = rf.feature_importances_

# 피처 중요도를 데이터프레임으로 변환
feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': rf_feature_importances})

# 중요도 순으로 정렬
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)

# 랜덤포레스트 피처 중요도 확인 및 저장
total_importance = sum(rf_feature_importances)
rf_feature_importance_percentages = (rf_feature_importances / total_importance) * 100
rf_feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': rf_feature_importance_percentages})
rf_feature_importance_df = rf_feature_importance_df.sort_values(by='Importance', ascending=False)
rf_feature_importance_df.to_excel('CB_RandomForest_feature_importance.xlsx', index=False)