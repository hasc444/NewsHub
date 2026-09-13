
import NewsItem from './NewsItem'
import React, { useEffect, useState } from 'react'

import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {
    
  const[article,setarticle]=useState([])
  const[page,setpage]=useState(1)
  const[loading,setloading]=useState(true)
  const[totalResults,settotalResults]=useState(0)

  const capitalize=(word)=>{
    word =word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    return word
  }

   async function updateNews(){
       let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`
      props.setProgress(10)

      let data= await fetch(url)
      let fdata= await data.json()
      console.log(fdata)
      props.setProgress(50)

      setarticle(fdata.articles)
      settotalResults(fdata.totalResults)
      setloading(false)

      props.setProgress(100)
    }

    useEffect(()=>{
      updateNews()
       document.title=`NewsHub-${capitalize(props.category)}`
       // eslint-disable-next-line
    },[])

//FOR PAGES HANDLE BY BUTTONS

   /* const handlePrevClick=async ()=>{
      setpage(page-1)
      updateNews() 
    }*/
    
  /*  const  handleNextClick=async ()=>{
      setpage(page+1)
      updateNews()
    }*/

const fetchMoreData = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.api_key}&page=${page + 1}&pageSize=${props.pageSize}`

  let data = await fetch(url)
  let fdata = await data.json()

  // If new articles exist, append them; otherwise stop loading
  if (fdata.articles && fdata.articles.length > 0) {
    setarticle((prev) => prev.concat(fdata.articles))
    settotalResults(fdata.totalResults)
    setpage(page + 1)
  } else {
    settotalResults(article.length) // Stops spinner when no more articles return
  }
}

    return (
      <>
      <h2 className='my-3' style={{textAlign: 'center'}}>NewsHub - Top {capitalize(props.category)} Headlines</h2>
         {loading && <Spinner/>}

         <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length < totalResults}
          loader={<Spinner/>}>

        <div className="container" >
          <div className="row">
            {article.map((element)=>{
              return  <div className="col-md-4 my-3" key={(element.url)}>
               <NewsItem title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> 
            </div>
            })}
          </div>
        </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
              <button disabled={page<=1} type="button" className="btn btn-dark mx-3" onClick={handlePrevClick}>&larr; Previous </button>
              <button disabled={page +1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}

         
        
            </>
    )
  }



 News.defaultProps={
    category : 'general',
    pageSize : 20
  }

News.propTypes={
    category : PropTypes.string,
    pageSize : PropTypes.number
  }

export default News
