import {Layout, Card, Statistic, List, Typography, Spin, Tag, Button} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
import {capitalize} from '../../utils'
import {useContext, useState} from "react";
import CryptoContext from "../../context/crypto-context.jsx";

const siderStyle = {
    paddingTop: '1rem',
};

export default function AppSlider() {
    const {assets} = useContext(CryptoContext);
    const [closedAssets, setClosedAssets] = useState([]);

    const handleClose = (id) => {
        console.log('Closing card with id:', id);
        setClosedAssets(prevClosedAssets => [...prevClosedAssets, id]);
    };

    //const handleClose = (id) => {
       // setClosedAssets([...closedAssets, id]);
    //};

    // Функция для проверки, является ли карточка закрытой
    const isClosed = (id) => closedAssets.includes(id);

    // Фильтруем активные карточки
    const activeAssets = assets.filter(asset => !isClosed(asset.id));

    return (<Layout.Sider width="25%" style={siderStyle}>
        {activeAssets.map(asset => (
            <Card key={asset.id} style={{marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                        }}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <Button type="text" icon={<CloseOutlined/>} onClick={() => handleClose(asset.id)}
                            style={{position: 'absolute', top: '10px', right: '10px'}}/>
                </div>
                <List
                    size="small"
                    dataSource={[
                        {title: 'Total Amount', value: asset.totalProfit, withTag: true},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <span>{item.title}</span>
                            <span>
                            {item.withTag && (<Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>)}
                                {item.isPlain && item.value}
                                {!item.isPlain && <Typography.Text
                                    type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                            </span>
                        </List.Item>
                    )}
                />
            </Card>
        ))}
    </Layout.Sider>)
};