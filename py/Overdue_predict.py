from tensorflow.keras.models import load_model
import pandas as pd
from sklearn.preprocessing import StandardScaler
import pickle
import numpy as np

# 학습 모델 로드
model = load_model('Overdue_model.h5')

# 테스트 데이터 로드
test_data = pd.read_excel('test_data.xlsx')
test_data = test_data.drop(['상품','RRC_CD','HAC_CD','지역코드','AD_NO','주거지','주소지','ADD_YN'], axis=1)

# 숫자형 특성 선택
X_test = test_data.select_dtypes(include=[np.number])

# 훈련 데이터와 동일한 scaler를 사용하여 테스트 데이터를 스케일링합니다
scaler = StandardScaler()
scaler.fit(X_test)
X_test = scaler.transform(X_test)

# 예측
predictions = model.predict(X_test)

# CB등급 값을 소수점 아래로 내림
predictions_rounded = np.floor(predictions).flatten()

# 결과 데이터프레임 생성
result = pd.DataFrame({'Predicted_연체': predictions_rounded})

# 엑셀 파일로 저장
result.to_excel('test_data_Overdue_predictions.xlsx', index=False)



