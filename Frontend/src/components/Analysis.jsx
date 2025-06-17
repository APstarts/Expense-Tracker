import Chart from "./Chart";
import {useState, useEffect} from 'react';

function Analysis() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/expenses/analyzebychart')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
        });
    },[])

    return (
        <div className="analysis-content-container flex flex-col items-center">
            <h1 className="dark:text-white">Analysis Page</h1>
            <Chart chartingdata={data}/>
        </div>
    )
}

export default Analysis;