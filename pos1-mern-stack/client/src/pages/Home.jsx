import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import DefaultLayout from '../components/DefualtLayout'
import ItemList from '../components/ItemList'

const Home = () => {

    const [itemsData, setItemsData] = useState([])

    useEffect(() => {
        const getAllItems = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/api/items/get-item')
                setItemsData(data)
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        getAllItems()
    }, [])


    return (
        <>
            <DefaultLayout>
                <Row gutter={[16, 16]}>
                    {
                        itemsData.map((item) => (
                            <Col key={item._id} xs={24} lg={6} md={12} ms={6}>
                                <ItemList item={item} />
                            </Col>
                        ))
                    }
                </Row>
            </DefaultLayout>
        </>
    )
}

export default Home
