from typing import Dict, List, Union
import uuid

class SparseBitVec:
    def __init__(self, background: Dict[uuid.UUID, int], gene_set: List[uuid.UUID]):
        self.v = [background.get(gene_id) for gene_id in gene_set if gene_id in background]

class DenseBitVec:
    def __init__(self, background: Dict[uuid.UUID, int], gene_set: Union[List[uuid.UUID], List[str]]):
        self.v = [0] * len(background)
        self.n = 0
        for gene_id in gene_set:
            if isinstance(gene_id, str):
                gene_id = uuid.UUID(gene_id)
            if gene_id in background:
                gene_index = background[gene_id]
                if self.v[gene_index] == 0:
                    self.n += 1
                    self.v[gene_index] = 1

class Bitmap:
    def __init__(self):
        self.columns: Dict[uuid.UUID, int] = {}
        self.columns_str: List[str] = []
        self.values: List[tuple[uuid.UUID, SparseBitVec]] = []
        self.terms: Dict[uuid.UUID, List[tuple[uuid.UUID, str, str]]] = {}

def compute_overlap(a: DenseBitVec, b: SparseBitVec) -> int:
    return sum(a.v[i] for i in b.v)