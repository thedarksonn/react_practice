import React from 'react'

import { Card } from 'antd'
const { Meta } = Card;


const ItemList = ({ item }) => {
    return (
        <>

            <Card hoverable style={{ width: 240, marginBottom: '5px' }} cover={<img alt="example" src={item.image} style={{ height: "150px" }} />}>
                <Meta title={item.name} />
            </Card>


        </>
    )
}

export default ItemList