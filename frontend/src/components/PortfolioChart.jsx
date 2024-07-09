import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'; // Импортируйте компонент Pie
import {useCrypto} from '../context/crypto-context.jsx'

ChartJS.register(ArcElement, Tooltip, Legend);
export default function PortfolioChart() {
    const {assets} = useCrypto()

    const data = {
        labels: assets.map((a)=> a.name),
        datasets: [{
            label: 'My First Dataset',
            data: assets.map((a)=> a.totalAmount),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }
    return <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'center', height: 400 }}><Pie data={data}></Pie></div>
}
