import React, {useState, useEffect} from 'react'
import "./table.css"

export const Table = (props) => {
    const [isValid, setIsValid] = useState(true)
    const {data} = props

    useEffect(()=>{
        preload()
    }, [])

    function validPhone(phone) {
        if (+phone != phone && phone.length !== 12) return false
        else if(phone.length === 10 && +phone == phone) return true
        else if(phone.length === 11 && +phone == phone && phone[0] == 1) return true
        else if(phone.length === 12 && +phone.slice(1) == phone.slice(1) && phone[0] === "+" && phone[1] === '1') return true
        return false
    }

    function printPhone(phone) {
        return validPhone(phone)?phone.length === 10? "+1" + phone: phone.length === 11 ? "+" + phone : phone : phone
    }

    function validEmail(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }

    function validAge(age) {
        return !Number.isNaN(+age) && age % 1 === 0 && +age >= 21
    }

    function validExperience(experience, age) {
        return !Number.isNaN(+experience) && +experience >= 0 && +experience % 1 === 0 && +age - 21 >= +experience 
    }

    function validYearlyIncome(income) {
        return !Number.isNaN(+income) && +income >= 0 && +income <= 1e6
    }

    function validHasChildren(hasChildren) {
        return hasChildren.toLowerCase() === "true" || hasChildren.toLowerCase() === "false" || hasChildren.toLowerCase() === ""
    }

    function validLicenseStates(state) {
        let splittedState = state.split("|");
        let isGood = true
        splittedState.forEach(el => {
            console.log(!/^[a-zA-Z]*$/.test(el))
            if (!/^[a-zA-Z]*$/.test(el)) {isGood = false}
        })
        return isGood
    }

    function printLicenseState(state) {
        let splitted = state.split("|") 
        return splitted.map(el => el.slice(0, 2).toUpperCase()).join(", ")
    }

    function validExpirationDate(date) {
        const daysInMonths = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31}
        let month, day, year;
        if (date.split('/').length === 3) {
            [month, day, year] = date.split('/')
        } else if (date.split('-').length === 3) {
            [year, month, day] = date.split('-')
        } else {
            return false
        }
        if ((+month <= 0 || +month > 12) || (year.length !== 4 || +year != year)) {
            return false;
        } else if(+day < 0 || +day > daysInMonths[+month])
            return false;
        const DateFromData = new Date(date)
        if (DateFromData - new Date() > 0)
            return true
        return false;
    }

    function validLicenseNumber(number) {
        return /^[a-zA-Z0-9]*$/.test(number) && number.length === 6
    }

    function findDuplicate(email, phone, index) {
        let counter = 0;
        let middleIndex;
        for (let i = data.length - 1; i >= 0; i--) {
            if(data[i]["email"].toLowerCase() === email.toLowerCase() || printPhone(data[i]["phone"]) === printPhone(phone)) {
                counter++;
                if (i !== index) {
                    middleIndex = i + 1;
                }
            }
        }
        if (counter === 1) return "unique"
        return middleIndex;
    }

    function CreateRow() {
        let rows = data.map((el, index) => {
            return <tr key={index + 1} >
                <td>
                    {index + 1}
                </td>
                <td>
                    {el["full name"]}
                </td>
                <td className={validPhone(el["phone"]) ? "" : "bg-red"}>
                    {printPhone(el["phone"])}
                </td>
                <td className={validEmail(el["email"]) ? "" : "bg-red"}>
                    {el["email"]}
                </td>
                <td className={validAge(el["age"]) ? "" : "bg-red"}>
                    {el["age"]}
                </td>
                <td className={validExperience(el["experience"], el["age"]) ? "" : "bg-red"}>
                    {el["experience"]}
                </td>
                <td className={validYearlyIncome(el["yearly income"]) ? "" : "bg-red"}>
                    {Number.isNaN(+el["yearly income"]) ? el["yearly income"] : Number(el["yearly income"]).toFixed(2)}
                </td>
                <td className={validHasChildren(el["has children"]) ? "" : "bg-red"}>
                    {el["has children"].toLowerCase() === "true" || el["has children"].toLowerCase() === "false" ? el["has children"].toUpperCase() : el["has children"].toLowerCase() === "" ? "FALSE" : el["has children"]}
                </td>
                <td className={validLicenseStates(el["license states"]) ? "" : "bg-red"}>
                    {validLicenseStates(el['license states']) ? printLicenseState(el['license states']) : el['license states'].split("|").join(", ")}
                </td>
                <td className={validExpirationDate(el["expiration date"]) ? "" : "bg-red"}>
                    {el["expiration date"]}
                </td>
                <td className={validLicenseNumber(el["license number"]) ? "" : "bg-red"}>
                    {el["license number"]}
                </td>
                <td>
                    {findDuplicate(el["email"], el["phone"], index)}
                </td>
            </tr>
        })
        return rows
    }

    function preload() {
        let isGood = true
        for (let i = 0; i < data.length; i++) {
            if (data[i]["full name"] === "" || data[i]["phone"] === "" || data[i]["email"] === "") {
                isGood = false;
                break;
            }
        }
        if (!isGood) {
            setIsValid(false)
        }
    }

    return (
        <>
        {
            isValid ? (
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Full name</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>Age</td>
                            <td>Experience</td>
                            <td>Yearly income</td>
                            <td>Has children</td>
                            <td>License states</td>
                            <td>Expiration date</td>
                            <td>License Number</td>
                            <td>Duplicate with</td>
                        </tr>
                    </thead>
                    <tbody>
                        <CreateRow />
                    </tbody>
                </table>
            ) : (
                <div className="error">Not valid information</div>
            )
        }
        </>
    )
}
