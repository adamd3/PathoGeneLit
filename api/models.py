from pydantic import BaseModel
from typing import List


class GeneSet(BaseModel):
    genes: List[str]


class QueryResult(BaseModel):
    gene_set_hash: str
    n_overlap: int
    odds_ratio: float
    pvalue: float
    adj_pvalue: float


class QueryResponse(BaseModel):
    results: List[QueryResult]
    content_range: tuple
