from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json
import time
import pandas as pd

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


@app.get("/")
async def root(skip: int = 0, limit: int = 100):
    csv_filename = "large_dataset.csv"

    # Test 1: Read entire CSV file
    start_time = time.time()
    df_entire = pd.read_csv(csv_filename)
    end_time = time.time()
    entire_csv_time = end_time - start_time

    dataset_length = len(df_entire.axes[0])

    # Test 2: Read specific columns and rows from the CSV file
    start = skip  # Starting point for rows to read
    chunk_size = limit  # Number of rows to read

    start_time = time.time()
    df_subset = pd.read_csv(
        csv_filename,
        skiprows= range(1, start + 1),
        nrows=int(chunk_size),
    )
    end_time = time.time()
    subset_csv_time = end_time - start_time

    # Print the results
    print(f"Time taken to read entire CSV: {entire_csv_time:.4f} seconds")
    print(f"Time taken to read subset of CSV: {subset_csv_time:.4f} seconds")

    # Display the first few rows of each dataframe for verification
    print("\nFirst few rows of entire CSV dataframe:")
    print(df_entire.head())

    print("\nFirst few rows of subset CSV dataframe:")
    print(df_subset.head())


    unformatted_json = df_subset.to_json(orient='records')
    # Load the JSON string into a Python object
    json_object = json.loads(unformatted_json)
    # Format and indent the JSON data
    formatted_json = json.dumps(json_object)

    return {"data": formatted_json, "total_records": dataset_length}
