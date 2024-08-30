import { Button, Table, message } from 'antd'
import React, { useState, useEffect } from 'react'
import ProductsForm from './ProductsForm'

import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/LoaderSlice'
import { GetProducts } from '../../../apicalls/products'

const Products = () => {

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [products, setProducts] = React.useState([])
    const [showProductForm, setShowProductForm] = useState(false)

    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(setLoader(true))
            const response = await GetProducts()
            setProducts(response.products)
            dispatch(setLoader(false))
            if (response.success) {
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }


    useEffect(() => {
        getData()
    }, [])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className='flex gap-5'>
                    <i className='ri-delete-bin-line'></i>
                    <i className='ri-pencil-line'
                        onClick={() => {
                            setSelectedProduct(record)
                            setShowProductForm(true)
                        }}
                    ></i>
                </div>
            }
        },
    ]

    return (
        <div>

            <div className='flex justify-end mb-2'>
                <Button
                    type='primary'
                    onClick={() => {
                        setSelectedProduct(null)
                        setShowProductForm(true)
                    }}
                >
                    Add Product
                </Button>
            </div>

            <Table columns={columns} dataSource={products} />

            {showProductForm && <ProductsForm showProdctForm={showProductForm} setShowProductForm={setShowProductForm} selectedProduct={selectedProduct} getData={getData} />}
        </div>
    )
}

export default Products