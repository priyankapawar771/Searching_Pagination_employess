import React,{Component,useState,useEffect} from "react";
import ReactPagination from 'react-paginate';

let perPage = 10;
let id=1;
export default function App(){
 
  const[currentPage,setCurrentPage] = useState(0);
  const[searchItem,setSearchItem] = useState("");
  const[dataa,setDataa] = useState([]);

  
 
  const fetchApi=()=>{
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res=>res.json())
    .then((data)=>{
      console.log(data);
      setDataa(data);
    })
  }
  useEffect(()=>{
    fetchApi()
  },[])

  function handlePageClick({selected:selectedPage}){
    console.log('selected page',selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage*perPage;
  const pageCount = Math.ceil(dataa.length/perPage);

 
  return(
    <div>
    <input type='text' placeholder="search...." onChange={event=>{setSearchItem(event.target.value)}}/>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {dataa.filter(val=>{if(val.title.toLowerCase().includes(searchItem.toLowerCase())){
            return val
          }}).slice(offset,offset+perPage).map(val=>{
            return(
              <tr key={val.id}>
                <td >{val.userId}</td>
                <td >{val.id}</td>
                <td>{val.title}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ReactPagination previousLabel={'<-Previous'}
      nextLabel={'Next->'}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      />
    </div>
  )
}
