import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingClassifier
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



### Gradient Boosting

# GradientBoosting 모델 학습
gb = GradientBoostingClassifier(n_estimators=100, random_state=42)
gb.fit(X_train, y_train)

# 훈련,테스트 데이터에서의 예측
train_pred = gb.predict(X_train)
test_pred = gb.predict(X_test)

# 정확도 계산
train_accuracy = accuracy_score(y_train, train_pred)
test_accuracy = accuracy_score(y_test, test_pred)
print(f'Train Accuracy: {train_accuracy:.4f}')  # Train Accuracy: 0.4083
print(f'Test Accuracy: {test_accuracy:.4f}')    # Test Accuracy: 0.4010

# 피처 중요도 확인
gb_feature_importances = gb.feature_importances_

# 피처 중요도를 데이터프레임으로 변환
feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': gb_feature_importances})

# 중요도 순으로 정렬
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)

# GBM 피처 중요도 확인 및 저장
total_importance = sum(gb_feature_importances)
gb_feature_importance_percentages = (gb_feature_importances / total_importance) * 100
gb_feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': gb_feature_importance_percentages})
gb_feature_importance_df = gb_feature_importance_df.sort_values(by='Importance', ascending=False)
gb_feature_importance_df.to_excel('CB_GradientBoosting_feature_importance.xlsx', index=False)