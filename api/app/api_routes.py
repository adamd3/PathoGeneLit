from fastapi import APIRouter, File, Form, UploadFile
from typing import Optional

router = APIRouter()


@router.post("/api/enrichment")
async def enrichment(file: Optional[UploadFile] = None, geneList: Optional[str] = Form(None)):

    if file:
        contents = await file.read()
        gene_list = contents.decode("utf-8").splitlines()
    else:
        gene_list = geneList.splitlines()

    return {"submitted_genes": gene_list}
