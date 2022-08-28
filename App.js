import React,{Component,useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';

let PER_PAGE = 10;

export default function App(){
  const[currentPage,setCurrentPage] = useState(0)
  const[searchTerm,setSearchTerm]=useState('');
  const[dataa,setDataa] = useState([])
  const fetchApi=()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res=>res.json())
    .then((data)=>{console.log(data)
      setDataa(data);
    }
    )
  }
  useEffect(() => {
    fetchApi();
  }, []);

  function handlePageClick({selected:selectedPage}){
    console.log('selectedPage',selectedPage);
    setCurrentPage(selectedPage);
   }
  
   const offset = currentPage * PER_PAGE;
  
  
  
   const pageCount = Math.ceil(dataa.length/PER_PAGE);


  return(
    <div>
  <input type='text' placeholder='search' onChange={event=>{setSearchTerm(event.target.value)}}/>
    {dataa.filter((val)=>{
      if(searchTerm==''){
      return val;
      }else if(val.title.toLowerCase()
      .includes(searchTerm.toLowerCase())){
        return val
      }
    }).slice(offset,offset+PER_PAGE).map((val)=>{
      return(
        <div><li>{val.id}</li>
          {val.title}

        </div>
      )
    })}
    <ReactPaginate previousLabel={'<-Previous'}
        nextLabel = {'Next ->'}
        pageCount = {pageCount}
        onPageChange={handlePageClick}
        

      />
    </div>
  )
}