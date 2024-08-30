import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Articles = () => {


    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticles()
    }, [])
    const fetchArticles = async () => {
        const { data: response } = await axios.get("http://localhost:8080/articles",)
        setArticles(response)

    }


    return (
        <>

            <div className="container">
                <div className='row d-flex justify-content-center align-items-center mt-4'>
                    <div className='col-md-8 mt-4'>
                        {articles.length ?
                            <div className='row'>
                                {articles.map((article) => (
                                    <div key={article._id} className='col-md-4'>
                                        <div className="card mb-4">
                                            <img className="card-img-top" src={article.imageUrl} alt="..." />
                                            <div className="card-body">
                                                <h2 className="card-title h4">{article.title}</h2>
                                                <p className="card-text">{article.content}.</p>
                                                <a className="btn btn-primary" href="#!">Read more →</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            : <div>

                                <div className="alert alert-success" role="alert">
                                    <h4 className="alert-heading">Well done!</h4>
                                    <p>you don't have a  plan.</p>
                                    <hr />
                                    <Link to="/article-plans" className="btn btn-sm btn-primary">Buy a plan</Link>
                                </div>

                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Articles