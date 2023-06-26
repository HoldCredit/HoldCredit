from tensorflow.keras.models import load_model
import pandas as pd
from learning.preprocessing import StandardScaler
import numpy as np
import sys

# 학습 모델 로드
CB_model = load_model('CB_model.h5')

def extract_output(*args):

    # args = tuple(try_convert_to_float(arg) for arg in args)
    #
    # cb_data = pd.DataFrame([args])
    # X_test = cb_data.select_dtypes(include=[np.number])
    #
    # scaler = StandardScaler()
    # scaler.fit(X_test)
    # try:
    #     scaler = StandardScaler()
    #     scaler.fit(X_test)
    # except Exception as e:
    #     print("Error during scaling:")
    #     print(e)
    #     print("X_test was:")
    #     print(X_test)
    #
    # X_test = scaler.transform(X_test)

    # predictions = CB_model.predict(X_test)
    # cbScore = np.floor(predictions).flatten()

    print(1)

    # for arg in args:
    #     print(arg)

def try_convert_to_float(arg):
    try:
        return float(arg)
    except ValueError:
        return arg

if __name__ == "__main__":
    extract_output(sys.argv[1:])
