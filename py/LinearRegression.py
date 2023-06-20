import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# 데이터 로드
train_data = pd.read_excel('train_data.xlsx')
train_data = train_data.drop(['SP','결과값(연체회차)'], axis=1)
train_data = pd.get_dummies(train_data, columns=['AD_NO', 'LIV_ADD', 'RES_ADD', 'ADD_YN'])

# 입력 (X) / 출력 (Y) 변수 분리
X = train_data.drop('CB', axis=1)
y = train_data['CB']

# 학습 데이터와 검증 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 특성 스케일링
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


### Linear Regression

# 모델 학습
lr = LinearRegression()
lr.fit(X_train, y_train)

# 예측
train_pred = lr.predict(X_train)
test_pred = lr.predict(X_test)

# MSE 계산
train_mse = mean_squared_error(y_train, train_pred)
test_mse = mean_squared_error(y_test, test_pred)
print(f'Train MSE: {train_mse:.4f}')
print(f'Test MSE: {test_mse:.4f}')

# 피처 중요도 확인
coefficients = lr.coef_
features = X.columns.tolist()

# 피처 중요도를 데이터프레임으로 변환
feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': coefficients})

# 중요도를 백분율로 변환
total_importance = sum(abs(coefficients))
lr_feature_importance_percentages = (abs(coefficients) / total_importance) * 100
lr_feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': lr_feature_importance_percentages})
lr_feature_importance_df = lr_feature_importance_df.sort_values(by='Importance', ascending=False)
lr_feature_importance_df.to_excel('CB_LinearRegression_feature_importance.xlsx', index=False)

