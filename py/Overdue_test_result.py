import pandas as pd

test_df = pd.read_excel('test_data.xlsx')
predict_df = pd.read_excel('test_data_Overdue_predictions.xlsx')

overdue = test_df['결과값(연체회차)']
predict_Overdue = predict_df['Predicted_연체']

# 카운트 변수 초기화
count = 0

# 각 행 비교하면서 카운트 증가
for i in range(len(overdue)):
    if overdue.iloc[i] == predict_Overdue.iloc[i]:
        count += 1

matching_ratio = count / len(overdue) * 100

# 결과 출력
print(f"{matching_ratio}%")  # 95.26100822469647%
