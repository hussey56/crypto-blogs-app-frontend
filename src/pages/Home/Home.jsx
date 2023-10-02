import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { getNews } from '../../api/external';
import Loader from '../../components/Loader/Loader'
const Home = () => {
  const [articles,setArticles] = useState([]);
const handleCardClick = (url)=>{
window.open(url,"_blank")
}

  useEffect(()=>{
    
(async function newsApiCall(){
const response = await getNews();
setArticles(response);
})();
//cleanup function
setArticles([]); 
  },[])
  if(articles.length === 0){
    return <Loader text={"Home"}/>
  }
  return (
   <>
   <div className={styles.header}>
    Latest News
   </div>

<div className={styles.grid}>
  {articles.map((article)=>(
    <div className={styles.card} key={article.url}  onClick={()=>handleCardClick(article.url)}>
<img src={article.urlToImage} alt={article.urlToImage} />
<h3>{article.title}</h3>
      </div>
  ))}
</div>
   </>
  )
}

export default Home
