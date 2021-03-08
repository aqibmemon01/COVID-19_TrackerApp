import React from "react";
import "./component.css"
function Table({ countries }) {
    return (
        <div className="table">
            <h3>Countries With Most Cases</h3>
            {countries.map((country) => (
                <tr>
                    <td>{country.country}</td>
                    <td>
                        <strong>{(country.cases)}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
}

export default Table;