from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import clickhouse_connect
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db_connection():
    client = clickhouse_connect.get_client(
        host="host_address",
        port=8123,
        database="db_name",
        user="user_name",
        password="pass",
        query_limit=0,
        compress=False,
    )
    return client


def get_db():
    db = get_db_connection()
    try:
        yield db
    finally:
        db.close()


@app.get("/tables", response_model=List[str])
async def get_tables(db=Depends(get_db)):
    try:
        query = "SHOW TABLES"
        tables = db.query(query).result_rows
        return [table[0] for table in tables]
    except Exception as e:
        logger.error(f"Error fetching tables: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching tables: {e}")


@app.get("/columns/{table_name}", response_model=List[str])
async def get_columns(table_name: str, db=Depends(get_db)):
    try:
        query = f"DESCRIBE TABLE {table_name}"
        columns = db.query(query).result_rows
        return [column[0] for column in columns]
    except Exception as e:
        logger.error(f"Error fetching columns: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching columns: {e}")


@app.get("/data/{table_name}", response_model=List[dict])
async def get_table_data(table_name: str, db=Depends(get_db)):
    try:
        query = f"SELECT * FROM {table_name}"
        data = db.query(query).result_rows
        columns = [
            col[0] for col in db.query(f"DESCRIBE TABLE {table_name}").result_rows
        ]
        return [dict(zip(columns, row)) for row in data]
    except Exception as e:
        logger.error(f"Error fetching table data: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching table data: {e}")


@app.get("/unique_values/{table_name}/{column_name}", response_model=List[str])
async def get_unique_values(table_name: str, column_name: str, db=Depends(get_db)):
    try:
        query = f"SELECT DISTINCT {column_name} FROM {table_name}"
        unique_values = db.query(query).result_rows
        return [value[0] for value in unique_values]
    except Exception as e:
        logger.error(f"Error fetching unique values: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error fetching unique values: {e}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
