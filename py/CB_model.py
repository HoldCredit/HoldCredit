import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
import numpy as np

# 데이터 로드
train_data = pd.read_excel('train_data.xlsx')
train_data = train_data.drop(['상품','RRC_CD','HAC_CD','지역코드','AD_NO','주거지','주소지','ADD_YN','SP등급','결과값(연체회차)'], axis=1)

# 학습에 사용할 특성과 레이블 분리
X = train_data.select_dtypes(include=[np.number])
y = train_data['CB등급']

# 데이터 전처리
scaler = StandardScaler()
X = scaler.fit_transform(X)

# 학습 데이터와 검증 데이터 분리
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# 모델 생성
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1)
])

# 모델 컴파일
model.compile(optimizer='adam', loss='mean_squared_error')

# 모델 학습
model.fit(X_train, y_train, epochs=10, validation_data=(X_val, y_val))

# 모델 저장
model.save('CB_model.h5')

# 특성 중요도 계산
importance = np.abs(model.layers[0].get_weights()[0]).sum(axis=1)
feature_importance = importance / np.sum(importance) * 100

# 각 특성과 그에 대한 영향력(%) 데이터프레임 생성
feature_names = train_data.columns[:-1]  # 마지막 열인 CB등급 제외
num_features = len(feature_names)

# feature_importance의 길이가 num_features와 일치하는지 확인
if len(feature_importance) != num_features:
    feature_importance = feature_importance[:num_features]

# 특성 중요도의 총합이 100이 되도록 조정
total_importance = np.sum(feature_importance)
feature_importance = (feature_importance / total_importance) * 100

# 엑셀 파일로 저장
impact_df = pd.DataFrame({'Feature': feature_names, 'Impact': feature_importance})
impact_df = impact_df.sort_values(by='Impact', ascending=False)
impact_df.to_excel('CB_feature_impact.xlsx', index=False)