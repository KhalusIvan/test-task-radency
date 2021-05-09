import React, {useState} from 'react'
import { Table } from './table/Table';
import { Dropzone } from './dropzone/Dropzone';
import "./csvReader.css"

export const CSVReader = () => {
    let [loaded, setLoaded] = useState(null)

    return (
        <div>
            <Dropzone setLoaded={setLoaded} />
            {
                Array.isArray(loaded) ? (
                    <Table data={loaded} />
                ) : (
                    loaded === "file type" &&
                        <div className="error">Uncorrect type of file</div>
                )
            }
            
        </div>
    )
}
