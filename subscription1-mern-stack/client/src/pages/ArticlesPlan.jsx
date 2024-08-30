import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ArticlesPlan = () => {

    const [prices, setPrices] = useState([])


    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const { data: response } = await axios.get("http://localhost:8080/subs/prices")
        setPrices(response.data)
        console.log(response.data)
    }



    const createSession = async (priceId) => {
        const { data: response } = await axios.post(
            "http://localhost:8080/subs/session",
            {
                priceId,
            }
        );

        window.location.href = response.url;
    };




    return (
        <>

            <div className="container">
                <div className='row d-flex justify-content-center align-items-center mt-4'>
                    <div className='col-md-8 mt-4'>
                        <div className='row'>

                            {prices.map((price) => (
                                <div key={price.id} className='col-md-4'>
                                    <div className="card mb-4 text-center">
                                        <div className="card-body">
                                            <div className="small text-muted"></div>
                                            <h2 className="card-title" style={{ fontSize: "25px", fontWeight: "900", textTransform: "capitalize" }}>{price.nickname}</h2>
                                            <div className="d-flex justify-content-center align-items-center mb-4">
                                                <span className="rounded-circle bg-primary text-light" style={{ padding: "30px", fontSize: "25px", fontWeight: "900" }}>$ {price.unit_amount / 100}</span>
                                            </div>
                                            <button className="btn btn-sm btn-primary" onClick={() => createSession(price.id)}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticlesPlan