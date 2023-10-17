import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, filterByCategory, sortAsc, sortDsc ,getAllProducts} from '../Redux/ProductsSlice'
import { search } from '../Redux/ProductsSlice'
const HomePage = () => {
    const dispatch = useDispatch() 
    const userName = useSelector(state=>state.login.userName)
    let items = useSelector(state=>state.products.temp)
    const [searchTxt,setSearchTxt] = useState('')

    useEffect(()=>{
        dispatch(fetchProducts())
    },[])

    // console.log(items)

    const handlegetproducts = () => {
        dispatch(getAllProducts())
    }
    useEffect(()=>{
         dispatch(getAllProducts())
    },[])

    const handleSearch = () => {
        let txt = searchTxt.toLowerCase()
        dispatch(search(txt))
    }

    const handlesortAsc = () => {
        dispatch(sortAsc())
    }
   
    const handlesortDsc = () => {
        dispatch(sortDsc())
    }

    const handleMenClothing = () => {
        dispatch(filterByCategory(`men's clothing`))
    }

    const handleJewellary = () => {
        dispatch(filterByCategory(`jewelery`))
    }

    const handleElectronics = () => {
        dispatch(filterByCategory('electronics'))
    }

    const handlewomensClothing = () => {
        dispatch(filterByCategory(`women's clothing`))
    }

  return (
   <>
   <div className='home-main'>

    <div className='header'>
    <div className='welcome'><p>Welcome {userName}</p></div>
    <button onClick={handlegetproducts} className='get-products'>Get all products</button>

    <div>
   <input type='text' placeholder='search for products here' onChange={e=>setSearchTxt(e.target.value)} />
   <button onClick={handleSearch} className='search-btn'>Search</button>
   </div>
   </div>

   <div className='sortContainer'>
    <p>Sort by price</p>
    <button onClick={handlesortAsc}>Low to High</button>
    <button onClick={handlesortDsc}>High to Low</button>
    </div>

    <div className='productsCategory'>
        <p>Sort category</p>
        <button onClick={handleMenClothing}>Mens Clothing</button>
        <button onClick={handleJewellary}>Jewellery</button>
        <button onClick={handleElectronics}>Electronics</button>
        <button onClick={handlewomensClothing}>Womens Clothing</button>
    </div>

   <div className='product-container'>
    {
        items?.map((item)=>{
            return <div className='product-card'>

                <p className='title'>{item.title}</p>
                <img src={item.image} />

                <div>
                    <span className='desc'>
                    {item.description}</span>
                    <br>
                    </br>
                    <span className='price'>
                    $ {item.price}
                    </span>
                    </div>
                </div>
            
        })
    }
   </div>
   </div>
   </>
  )
}

export default HomePage