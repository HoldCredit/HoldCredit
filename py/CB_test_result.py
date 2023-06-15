import pandas as pd

test_df = pd.read_excel('test_data.xlsx')
predict_df = pd.read_excel('test_data_CB_predictions.xlsx')

CB = test_df['CB등급']
predict_CB = predict_df['Predicted_CB등급']

# 카운트 변수 초기화
count = 0

# 각 행 비교하면서 카운트 증가
for i in range(len(CB)):
    if CB.iloc[i] == predict_CB.iloc[i]:
        count += 1

matching_ratio = count / len(CB) * 100

# 결과 출력
print(f"{matching_ratio}%")  # 99.6475130084485%
