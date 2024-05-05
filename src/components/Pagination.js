
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./pagination.css"

const PaginationData = () => {
    let [data , setData] = useState([])
    let [currentPage , setCurrentPage] = useState(1)
    let itemPerPage = 10
    let totalPage = Math.ceil(data.length / itemPerPage)
    const [error, setError] = useState(null);


 useEffect(()=>{
       
       const getData = async () => {
        
        try{
            let response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")          
            let data = response.data
            setData(data)
            console.log("data", data)
       
       
      }
      catch(error){
        setError("failed to fetch data" , error)
      }
    }
      
       getData();
 },[])


 const handlePervious=()=>{

      setCurrentPage((prevState)=> prevState - 1)
 }

const handleNext=()=>{

    setCurrentPage((prevState)=> prevState + 1)
}

       let startIndex = (currentPage - 1) * itemPerPage ;

       let endPage = startIndex + itemPerPage ;

       let  currentData = data.slice(startIndex , endPage);


  return (
    <div>
        <h1>Employee Data Table</h1>
       
       <div className="table-container">
        <table className="table">
            <thead className='table-header'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            </thead>

            <tbody className='table-body'>
         {currentData.slice(0,10).map((tableData , index)=>{
            return(
                 <tr key={index}>
                    <td>{tableData.id}</td>
                    <td>{tableData.name}</td>
                    <td>{tableData.email}</td>
                    <td>{tableData.role}</td>
                 </tr>
            )
         })}
         </tbody>
        </table>
       </div>
        <button className='pervious' onClick={handlePervious} disabled ={currentPage === 1}>Previous</button>
        <button className='next' onClick={handleNext} disabled = {currentPage === totalPage}>Next</button>
    </div>
  )
}

export default PaginationData
