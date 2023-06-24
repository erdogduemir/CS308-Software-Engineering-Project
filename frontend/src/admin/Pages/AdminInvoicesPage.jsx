import React, { useState, useEffect } from 'react'
import Sidebar from "./Functions/Sidebar"
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function AdminInvoicesPage() {

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(1)
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    function changePageBack() {
        changePage(-1)
    }

    function changePageNext() {
        changePage(+1)
    }
    

    return (
        <div className="dashboard main-content">
            <header className="page-header">
                <span className="page-title">Invoices</span>
            </header>
            <Sidebar />
            <div className='comments-container'>
                <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page width={800} pageNumber={pageNumber} />
                </Document>
                <p> Page {pageNumber} of {numPages} </p>
                {pageNumber > 1 &&
                <button onClick={changePageBack}>Previous Page</button>
                }
                {pageNumber < numPages &&
                <button onClick={changePageNext}>Next Page</button>
                }
            </div>
        </div>
    )
}