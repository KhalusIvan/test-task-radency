import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import "./dropzone.css"

export const Dropzone = (props) => {

    async function onLoadReader(evt) {
        const bstr = evt.target.result;
        let allInfo = bstr.split('\n')
        allInfo = allInfo.filter(el => el.trim())
        
        let table = []
        for (let i = 0; i < allInfo.length; i++) {
            let splited = allInfo[i].split(',')
            for (let j = 0; j < splited.length; j++) {
                if (i === 0) {
                    splited[j] = splited[j].toLowerCase().trim()
                } else {
                    splited[j] = splited[j].trim()
                }
            }
            table.push(splited)
        }
        let objectsArray = []
        for (let i = 1; i < table.length; i++) {
            let newObj = {}
            for (let j = 0; j < table[i].length; j++) {
                newObj[table[0][j]] = table[i][j]
            }
            objectsArray.push(newObj)
        }
        await props.setLoaded(objectsArray)
        
    }

    const onDrop = useCallback((acceptedFiles) => {
        let file = acceptedFiles[0]
        if (file.type !== "application/vnd.ms-excel") {
            props.setLoaded("file type")
            return
        }
        const reader = new FileReader();
        reader.onload = onLoadReader
        reader.readAsBinaryString(file);
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="dropzone__text">Drag and drop file here or click to select file</p>
        </div>
    )
}
